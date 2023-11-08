package com.lapasstalkuda.panicbutton.ui.login

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.messaging.FirebaseMessaging
import com.lapasstalkuda.panicbutton.MainActivity
import com.lapasstalkuda.panicbutton.api.ApiService
import com.lapasstalkuda.panicbutton.api.TokenRequest
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
    private lateinit var auth: FirebaseAuth

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

        auth = FirebaseAuth.getInstance()

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
//            postToken(deviceToken)
            val email = binding.inputUsername.text.toString()
            val password = binding.inputPassword.text.toString()
            signIn(email, password)
        }

        binding.btnRegister.setOnClickListener {
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun signIn(email: String, password: String) {
        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser
                    Toast.makeText(this, "Sign-in berhasil sebagai ${user?.email}", Toast.LENGTH_SHORT).show()

                    val intent = Intent(this@LoginActivity, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                } else {
                    Log.d("Login", "${task.exception?.message}")
                    Toast.makeText(this, "${task.exception?.message}", Toast.LENGTH_SHORT).show()
                }
            }
    }

    private fun postToken(token: String) {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://admittedly-factual-tuna.ngrok-free.app/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = retrofit.create(ApiService::class.java)
        val dataToken = TokenRequest(token)
        val call: Call<TokenRequest?>? = api.sendToken(dataToken)
        call!!.enqueue(object : Callback<TokenRequest?> {
            override fun onResponse(call: Call<TokenRequest?>?, response: Response<TokenRequest?>) {
                val response: TokenRequest? = response.body()
                Log.d("Login", "Berhasil coi ${response} tokennya: ${token}")
            }

            override fun onFailure(call: Call<TokenRequest?>, t: Throwable) {
                TODO("Not yet implemented")
            }

        })
    }
}