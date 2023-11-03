package com.lapasstalkuda.panicbutton.ui.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.google.firebase.messaging.FirebaseMessaging
import com.lapasstalkuda.panicbutton.databinding.ActivityLoginBinding
import com.lapasstalkuda.panicbutton.ui.register.RegisterActivity

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var deviceToken: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

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
            Toast.makeText(this@LoginActivity, deviceToken, Toast.LENGTH_SHORT).show()
//            val intent = Intent(this@LoginActivity, MainActivity::class.java)
//            startActivity(intent)
//            finish()
        }

        binding.btnRegister.setOnClickListener {
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            startActivity(intent)
        }
    }
}