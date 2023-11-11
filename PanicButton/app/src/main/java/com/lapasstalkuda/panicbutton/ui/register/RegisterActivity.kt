package com.lapasstalkuda.panicbutton.ui.register

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.lapasstalkuda.panicbutton.api.ApiService
import com.lapasstalkuda.panicbutton.api.RegisterRequest
import com.lapasstalkuda.panicbutton.databinding.ActivityRegisterBinding
import com.lapasstalkuda.panicbutton.ui.login.LoginActivity
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
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


        binding.btnRegister.setOnClickListener {
            val name = binding.inputName.text.toString()
            val email = binding.inputEmail.text.toString()
            val password = binding.inputPassword.text.toString()
            val confirmPassword = binding.inputConfirmPassword.text.toString()

            if (name.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
                Toast.makeText(this@RegisterActivity, "Field tidak boleh ada yang kosong", Toast.LENGTH_SHORT).show()
            } else if (password != confirmPassword) {
                Toast.makeText(this@RegisterActivity, "Konfirmasi password tidak sama dengan password", Toast.LENGTH_SHORT).show()
            } else if (password.length < 8 || confirmPassword.length < 8) {
                Toast.makeText(this@RegisterActivity, "Password minimal 8 karakter", Toast.LENGTH_SHORT).show()
            } else if (email.isNotEmpty() && password.isNotEmpty() && confirmPassword.isNotEmpty()) {
                if (!isValidEmail(binding.inputEmail.text.toString()) && email.isNotEmpty()) {
                    Toast.makeText(applicationContext, "Format email tidak valid", Toast.LENGTH_SHORT).show()
                } else {
                    register(name, email, password, confirmPassword)
                }
            }
        }

        binding.btnLogin.setOnClickListener {
            val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
            startActivity(intent)
            finishAffinity()
        }
    }

    private fun isValidEmail(text: CharSequence): Boolean {
        return !TextUtils.isEmpty(text) && android.util.Patterns.EMAIL_ADDRESS.matcher(text).matches()
    }

    private fun register(name: String, email: String, password: String, confirmPassword: String) {
        val dataRegister = RegisterRequest(name, email, password, confirmPassword)
        Log.d("Register Data", "$dataRegister")

        val loggingInterceptor =
            HttpLoggingInterceptor()
                .setLevel(HttpLoggingInterceptor.Level.BODY)

        val client = OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl("https://admittedly-factual-tuna.ngrok-free.app/api/auth/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()

        val api = retrofit.create(ApiService::class.java)
        val call: Call<RegisterRequest?>? = api.register(dataRegister)
        Log.d("Call", "$call")
        call!!.enqueue(object : Callback<RegisterRequest?> {
            override fun onResponse(call: Call<RegisterRequest?>?, response: Response<RegisterRequest?>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@RegisterActivity, "Daftar berhasil", Toast.LENGTH_SHORT).show()
                } else {
                    Log.d("Register", "${response}")
                    Toast.makeText(this@RegisterActivity, "Gagal ${response.errorBody()}", Toast.LENGTH_SHORT).show()
                }
//                val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
//                startActivity(intent)
//                finish()
            }

            override fun onFailure(call: Call<RegisterRequest?>, t: Throwable) {
                Toast.makeText(this@RegisterActivity, "Gagal", Toast.LENGTH_SHORT).show()
            }
        })
    }
}