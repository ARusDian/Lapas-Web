package com.lapasstalkuda.panicbutton.api

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val confirmPassword: String
)
