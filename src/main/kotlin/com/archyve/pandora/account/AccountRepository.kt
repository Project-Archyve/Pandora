package com.archyve.pandora.account

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AccountRepository : JpaRepository<Account, String> {
    fun getAccounts(): List<Account>
    fun getAccountById(id: String): Account
    fun getAccountByEmail(email: String): Account
    fun createAccount(account: Account)
    fun updateAccount(account: Account)
    fun deleteAccount(id: String)
}