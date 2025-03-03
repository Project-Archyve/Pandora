package com.archyve.pandora.account

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/accounts")
class AccountController @Autowired constructor(private val service: AccountService) {
    @GetMapping
    suspend fun getAccounts(): List<Account> {
        return service.getAccounts().getOrThrow()
    }

    @GetMapping("/{id}")
    suspend fun getAccountById(@PathVariable id: String): Account? {
        return service.getAccountById(id).getOrThrow()
    }

    @PostMapping
    suspend fun createAccount(@RequestBody account: Account): Account {
        return service.createAccount(account).getOrThrow()
    }

    @PutMapping("/{id}")
    suspend fun updateAccount(@PathVariable id: String, @RequestBody updatedAccount: Account): Account {
        return service.updateAccount(updatedAccount).getOrThrow()
    }

    @DeleteMapping("/{id}")
    suspend fun deleteAccount(@PathVariable id: String) {
        service.deleteAccount(id).getOrThrow()
    }
}