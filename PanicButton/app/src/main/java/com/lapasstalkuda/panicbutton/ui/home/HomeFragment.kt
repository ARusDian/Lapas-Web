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

        binding.btnKebakaran.setOnClickListener {
            postNotification("KEBAKARAN")
            Toast.makeText(context, "Kebakaran", Toast.LENGTH_SHORT).show()
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
            .baseUrl("https://74d6-36-85-32-10.ngrok-free.app/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = retrofit.create(ApiService::class.java)
        val dataNotification = NotificationRequest(type)
        val call: Call<NotificationRequest?>? = api.notification(dataNotification)
        call!!.enqueue(object : Callback<NotificationRequest?> {
            override fun onResponse(
                call: Call<NotificationRequest?>,
                response: Response<NotificationRequest?>
            ) {
                val response: NotificationRequest? = response.body()
                Log.d("Login", "Berhasul coi ${response} tipenya: ${type}")
            }

            override fun onFailure(call: Call<NotificationRequest?>, t: Throwable) {
                TODO("Not yet implemented")
            }

        })
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}