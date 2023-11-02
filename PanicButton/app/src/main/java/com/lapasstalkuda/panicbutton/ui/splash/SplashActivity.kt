package com.lapasstalkuda.panicbutton.ui.splash

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.lapasstalkuda.panicbutton.R
import com.lapasstalkuda.panicbutton.databinding.ActivitySplashBinding
import com.lapasstalkuda.panicbutton.ui.login.LoginActivity

class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val handler = Handler()
        handler.postDelayed({
            val intent = Intent(this@SplashActivity, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }, TIMER)
    }

    companion object {
        private const val TIMER = 2000L
    }
}