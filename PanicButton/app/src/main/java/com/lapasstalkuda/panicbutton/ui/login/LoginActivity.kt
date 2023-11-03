package com.lapasstalkuda.panicbutton.ui.login

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.messaging.FirebaseMessaging
import com.lapasstalkuda.panicbutton.api.ApiService
import com.lapasstalkuda.panicbutton.api.TokenRequest
import com.lapasstalkuda.panicbutton.api.TokenResponse
import com.lapasstalkuda.panicbutton.databinding.ActivityLoginBinding
import com.lapasstalkuda.panicbutton.ui.register.RegisterActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var deviceToken: String

    private val requestNotificationPermissionLauncher =
        registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { isGranted: Boolean ->
            if (isGranted) {
                Toast.makeText(this, "Notification permission granted", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Notification permission rejected", Toast.LENGTH_SHORT).show()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (Build.VERSION.SDK_INT >= 33) {
            requestNotificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
        }

        // Dapatin device tokennya disini
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w("LoginActivity", "Fetch DCM registration token", task.exception)
                return@addOnCompleteListener
            }

            val token = task.result
            deviceToken = token
        }

        binding.btnLogin.setOnClickListener {
            postToken(deviceToken)
//            val intent = Intent(this@LoginActivity, MainActivity::class.java)
//            startActivity(intent)
//            finish()
        }

        binding.btnRegister.setOnClickListener {
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun postToken(token: String) {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://74d6-36-85-32-10.ngrok-free.app/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = retrofit.create(ApiService::class.java)
        val dataToken = TokenRequest(token)
        val call: Call<TokenRequest?>? = api.sendToken(dataToken)
        call!!.enqueue(object : Callback<TokenRequest?> {
            override fun onResponse(call: Call<TokenRequest?>?, response: Response<TokenRequest?>) {
                val response: TokenRequest? = response.body()
                Log.d("Login", "Berhasul coi ${response} tokennya: ${token}")
            }

            override fun onFailure(call: Call<TokenRequest?>, t: Throwable) {
                TODO("Not yet implemented")
            }

        })
//        val client = ApiConfig.getApiService().sendToken(token)
//        client.enqueue(object : retrofit2.Callback<TokenResponse> {
//            override fun onResponse(call: Call<TokenResponse>, response: Response<TokenResponse>) {
//                val responseBody = response.body()
//                if (response.isSuccessful && responseBody != null) {
//                    Toast.makeText(this@LoginActivity, "Berhasil", Toast.LENGTH_SHORT).show()
//                } else {
//                    Log.e("LoginActivity", "onFailure: tes ${response.message()}")
//                }
//            }
//
//            override fun onFailure(call: Call<TokenResponse>, t: Throwable) {
//                Log.e("LoginActivity", "onFailure: ${t.message}")
//            }
//
//        })
    }
}