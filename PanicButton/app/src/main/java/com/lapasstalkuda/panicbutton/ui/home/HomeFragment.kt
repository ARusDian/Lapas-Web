package com.lapasstalkuda.panicbutton.ui.home

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GetTokenResult
import com.lapasstalkuda.panicbutton.api.ApiService
import com.lapasstalkuda.panicbutton.api.NotificationRequest
import com.lapasstalkuda.panicbutton.api.TokenRequest
import com.lapasstalkuda.panicbutton.databinding.FragmentHomeBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

private val Context.datastore: DataStore<Preferences> by preferencesDataStore(name = "settings")
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private lateinit var auth: FirebaseAuth

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        auth = FirebaseAuth.getInstance()

        binding.btnKebakaran.setOnClickListener {
            postNotification("KEBAKARAN")
        }

        binding.btnBencana.setOnClickListener {
            postNotification("BENCANA")
            Toast.makeText(context, "Bencana", Toast.LENGTH_SHORT).show()
        }

        binding.btnKerusuhan.setOnClickListener {
            postNotification("RUSUH")
            Toast.makeText(context, "Kerusuhan", Toast.LENGTH_SHORT).show()
        }
    }

    private fun postNotification(type: String) {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://admittedly-factual-tuna.ngrok-free.app/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = retrofit.create(ApiService::class.java)
        val dataNotification = NotificationRequest(type)

        auth.currentUser?.getIdToken(true)
            ?.addOnCompleteListener { task ->
                val tokenResult: GetTokenResult? = task.result
                val token = tokenResult?.token

                if (token != null) {
                    val call: Call<NotificationRequest?>? = api.notification(dataNotification)
                    val authorizationHeader = "Bearer $token"

                    call?.request()?.newBuilder()
                        ?.addHeader("Authorization", authorizationHeader)
                        ?.build()

                    call!!.enqueue(object : Callback<NotificationRequest?> {
                        override fun onResponse(
                            call: Call<NotificationRequest?>,
                            response: Response<NotificationRequest?>
                        ) {
                            val response: NotificationRequest? = response.body()
                            Toast.makeText(context, "Berhasil", Toast.LENGTH_SHORT).show()
                            Log.d("Login", "Berhasul coi ${token} tipenya: ${type}")
                        }

                        override fun onFailure(call: Call<NotificationRequest?>, t: Throwable) {
                            Toast.makeText(context, "Gagal", Toast.LENGTH_SHORT).show()
                        }
                    })

                    Toast.makeText(context, "token adalah ${token}", Toast.LENGTH_SHORT).show()
                }
            }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}