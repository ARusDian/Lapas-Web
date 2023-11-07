package com.lapasstalkuda.panicbutton.ui.register

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.lapasstalkuda.panicbutton.MainActivity
import com.lapasstalkuda.panicbutton.R
import com.lapasstalkuda.panicbutton.api.ApiService
import com.lapasstalkuda.panicbutton.api.NotificationRequest
import com.lapasstalkuda.panicbutton.api.RegisterRequest
import com.lapasstalkuda.panicbutton.api.TokenRequest
import com.lapasstalkuda.panicbutton.databinding.ActivityRegisterBinding
import com.lapasstalkuda.panicbutton.ui.login.LoginActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val name = binding.inputName.text.toString()
        val email = binding.inputEmail.text.toString()
        val password = binding.inputPassword.text.toString()
        val confirmPassword = binding.inputConfirmPassword.text.toString()

        binding.btnRegister.setOnClickListener {
            register(name, email, password, confirmPassword)
        }

        binding.btnLogin.setOnClickListener {
            val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
            startActivity(intent)
        }
    }

    private fun register(name: String, email: String, password: String, confirmPassword: String) {
        val dataRegister = RegisterRequest(name, email, password, confirmPassword)
        val retrofit = Retrofit.Builder()
            .baseUrl("https://admittedly-factual-tuna.ngrok-free.app/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val api = retrofit.create(ApiService::class.java)
        val call: Call<RegisterRequest?>? = api.register(dataRegister)
        call!!.enqueue(object : Callback<RegisterRequest?> {
            override fun onResponse(call: Call<RegisterRequest?>?, response: Response<RegisterRequest?>) {
                Toast.makeText(this@RegisterActivity, "Daftar berhasil", Toast.LENGTH_SHORT).show()
                val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
                startActivity(intent)
                finish()
            }

            override fun onFailure(call: Call<RegisterRequest?>, t: Throwable) {
                Toast.makeText(this@RegisterActivity, "Gagal", Toast.LENGTH_SHORT).show()
            }

        })
    }
}