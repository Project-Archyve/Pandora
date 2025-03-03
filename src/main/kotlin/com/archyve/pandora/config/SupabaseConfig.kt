package com.archyve.pandora.config

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.auth.Auth
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.storage.Storage
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SupabaseConfig {

    @Value("\${supabase.url}")
    private lateinit var supabaseUrl: String

    @Value("\${supabase.anon.key}")
    private lateinit var supabaseAnonKey: String

    @Bean
    fun supabaseClient(): SupabaseClient {
        return createSupabaseClient(supabaseUrl, supabaseAnonKey) {
            install(Auth)
            install(Postgrest)
            install(Storage)
        }
    }
}