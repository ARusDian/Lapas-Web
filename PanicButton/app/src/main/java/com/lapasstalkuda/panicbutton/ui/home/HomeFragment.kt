package com.lapasstalkuda.panicbutton.ui.home

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.lapasstalkuda.panicbutton.databinding.FragmentHomeBinding

private val Context.datastore: DataStore<Preferences> by preferencesDataStore(name = "settings")
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnKebakaran.setOnClickListener {
            Toast.makeText(context, "Kebakaran", Toast.LENGTH_SHORT).show()
        }

        binding.btnBencana.setOnClickListener {
            Toast.makeText(context, "Bencana", Toast.LENGTH_SHORT).show()
        }

        binding.btnKerusuhan.setOnClickListener {
            Toast.makeText(context, "Kerusuhan", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}