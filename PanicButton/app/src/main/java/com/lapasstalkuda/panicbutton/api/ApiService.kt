package com.lapasstalkuda.panicbutton.api

import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Response
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
}