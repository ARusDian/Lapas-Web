package com.lapasstalkuda.panicbutton.ui.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ProfileViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "Halaman Profile"
    }
    val text: LiveData<String> = _text
}