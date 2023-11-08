package com.lapasstalkuda.panicbutton.api

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiService {

    @POST("deviceToken")
    fun sendToken(
        @Header("Authorization") authToken: String,
        @Body token: TokenRequest?
    ): Call<TokenRequest?>?

    @POST("notification")
    fun notification(
        @Header("Authorization") token: String,
        @Body notification: NotificationRequest?,
    ): Call<NotificationRequest?>?

    @POST("register")
    fun register(
        @Body register: RegisterRequest?,
    ): Call<RegisterRequest?>?
}