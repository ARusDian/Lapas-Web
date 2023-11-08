package com.lapasstalkuda.panicbutton.api

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("deviceToken")
    fun sendToken(
        @Body token: TokenRequest?
    ): Call<TokenRequest?>?

    @POST("notification")
    fun notification(
        @Body notification: NotificationRequest?,
    ): Call<NotificationRequest?>?

    @POST("register")
    fun register(
        @Body register: RegisterRequest?,
    ): Call<RegisterRequest?>?
}