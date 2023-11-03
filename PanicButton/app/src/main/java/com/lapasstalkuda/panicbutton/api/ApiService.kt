package com.lapasstalkuda.panicbutton.api

import com.lapasstalkuda.panicbutton.data.NotificationRequest
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
    suspend fun notification(
        @Body notification: NotificationRequest,
    ): Response<ResponseBody>
}