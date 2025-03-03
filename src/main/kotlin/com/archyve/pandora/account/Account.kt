package com.archyve.pandora.account

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
data class Account(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: String,
    var firstName: String,
    var lastName: String,
    var email: String,
    var password: String
)
