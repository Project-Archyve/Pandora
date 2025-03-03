package com.archyve.pandora.account

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import kotlin.Exception

@ResponseStatus(HttpStatus.NOT_FOUND)
class AccountsNotFoundException(cause: Throwable? = null):
    Exception("Failed to find any accounts", cause)

@ResponseStatus(HttpStatus.NOT_FOUND)
class AccountNotFoundException(cause: Throwable? = null):
    Exception("Failed to find account", cause)

@ResponseStatus(HttpStatus.BAD_REQUEST)
class AccountCreationFailedException(account: Account, cause: Throwable? = null):
    Exception("Failed to create account: ${account.email}", cause)

@ResponseStatus(HttpStatus.NOT_FOUND)
class AccountDeletionFailedException(id: String, cause: Throwable? = null):
    Exception("Failed to delete account: $id", cause)

@ResponseStatus(HttpStatus.BAD_REQUEST)
class AccountUpdateFailedException(account: Account, cause: Throwable? = null):
    Exception("Failed to update account: ${account.email}", cause)