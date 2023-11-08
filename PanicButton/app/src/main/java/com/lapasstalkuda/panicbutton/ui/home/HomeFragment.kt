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
import com.google.firebase.messaging.FirebaseMessaging
import com.lapasstalkuda.panicbutton.api.ApiService
import com.lapasstalkuda.panicbutton.api.NotificationRequest
import com.lapasstalkuda.panicbutton.api.TokenRequest
import com.lapasstalkuda.panicbutton.databinding.FragmentHomeBinding
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

private val Context.datastore: DataStore<Preferences> by preferencesDataStore(name = "settings")
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private lateinit var auth: FirebaseAuth
    private lateinit var deviceToken: String

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

        // Dapatin device tokennya disini
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w("LoginActivity", "Fetch DCM registration token", task.exception)
                return@addOnCompleteListener
            }

            val token = task.result
            deviceToken = token

            postToken(deviceToken)
        }

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
        auth.currentUser?.getIdToken(true)
            ?.addOnCompleteListener { task ->
                val tokenResult: GetTokenResult? = task.result
                val token = tokenResult?.token

                if (token != null) {
                    val loggingInterceptor =
                        HttpLoggingInterceptor()
                            .setLevel(HttpLoggingInterceptor.Level.BODY)

                    val client = OkHttpClient.Builder()
                        .addInterceptor(loggingInterceptor)
                        .build()

                    val retrofit = Retrofit.Builder()
                        .baseUrl("https://admittedly-factual-tuna.ngrok-free.app/api/")
                        .addConverterFactory(GsonConverterFactory.create())
                        .client(client)
                        .build()

                    val api = retrofit.create(ApiService::class.java)
                    val dataNotification = NotificationRequest(type)
                    val call: Call<NotificationRequest?>? = api.notification("Bearer $token", dataNotification)

                    call!!.enqueue(object : Callback<NotificationRequest?> {
                        override fun onResponse(
                            call: Call<NotificationRequest?>,
                            response: Response<NotificationRequest?>
                        ) {
                            if (response.isSuccessful) {
                                val response: NotificationRequest? = response.body()
                                Toast.makeText(context, "Berhasil", Toast.LENGTH_SHORT).show()
                                Log.d("NOTIFICATION", "Berhasul coi ${token} tipenya: ${type}")
                            } else {
                                Log.d("NOTIFICATION", "Gagal tipenya: ${type}")
                            }
                        }

                        override fun onFailure(call: Call<NotificationRequest?>, t: Throwable) {
                            Toast.makeText(context, "Gagal", Toast.LENGTH_SHORT).show()
                        }
                    })
                }
            }
    }

    private fun postToken(deviceToken: String) {
        auth.currentUser?.getIdToken(true)
            ?.addOnCompleteListener { task ->
                val loggingInterceptor =
                    HttpLoggingInterceptor()
                        .setLevel(HttpLoggingInterceptor.Level.BODY)

                val client = OkHttpClient.Builder()
                    .addInterceptor(loggingInterceptor)
                    .build()

                val retrofit = Retrofit.Builder()
                    .baseUrl("https://admittedly-factual-tuna.ngrok-free.app/api/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client)
                    .build()

                val api = retrofit.create(ApiService::class.java)
                val dataToken = TokenRequest(deviceToken)

                val tokenResult: GetTokenResult? = task.result
                val token = tokenResult?.token
                Log.d("DEVICE TOKEN", "${deviceToken}")

                if (token != null) {
                    val call: Call<TokenRequest?>? = api.sendToken("Bearer $token", dataToken)

                    call!!.enqueue(object : Callback<TokenRequest?> {
                        override fun onResponse(call: Call<TokenRequest?>?, response: Response<TokenRequest?>) {
                            if (response.isSuccessful) {
//                                val response: TokenRequest? = response.body()
                                Log.d("TOKEN", "Berhasil kirim tokennya: ${deviceToken}")
                            } else {
                                Log.d("TOKEN", "Gagal kirim tokennya ${response}")
                            }
                        }

                        override fun onFailure(call: Call<TokenRequest?>, t: Throwable) {
                            TODO("Not yet implemented")
                        }

                    })
                }
            }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}