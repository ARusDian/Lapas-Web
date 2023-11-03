package com.lapasstalkuda.panicbutton.api

data class NotificationRequest(
    val type: String,
    val userId: Int = 1
)
