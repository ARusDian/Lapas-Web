package com.lapasstalkuda.panicbutton.ui.faq

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class FaqViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "Halaman FAQ"
    }
    val text: LiveData<String> = _text
}