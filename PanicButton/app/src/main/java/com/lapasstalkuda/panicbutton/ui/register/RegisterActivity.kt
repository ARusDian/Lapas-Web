package com.lapasstalkuda.panicbutton.ui.register

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.lapasstalkuda.panicbutton.MainActivity
import com.lapasstalkuda.panicbutton.R
import com.lapasstalkuda.panicbutton.databinding.ActivityRegisterBinding
import com.lapasstalkuda.panicbutton.ui.login.LoginActivity

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnRegister.setOnClickListener {
            val intent = Intent(this@RegisterActivity, MainActivity::class.java)
            startActivity(intent)
        }

        binding.btnLogin.setOnClickListener {
            val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
            startActivity(intent)
        }
    }
}