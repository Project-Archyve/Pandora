package com.archyve.pandora.account

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.postgrest.exception.PostgrestRestException
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Columns
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AccountService @Autowired constructor(private val supabase: SupabaseClient) {

    private val logger = LoggerFactory.getLogger(AccountService::class.java)

    suspend fun getAccounts(): Result<List<Account>> {
        return try {
            val accounts = supabase.from("accounts").select(Columns.ALL).decodeList<Account>()
            Result.success(accounts)
        } catch (e: PostgrestRestException) {
            logger.error("[AccountService]: Postgrest error getting accounts", e)
            Result.failure(AccountsNotFoundException())
        } catch(e: Exception) {
            logger.error("[AccountService]: Error getting accounts", e)
            Result.failure(AccountsNotFoundException())
        }
    }

    suspend fun getAccountById(id: String): Result<Account?> {
        return try {
            val account = supabase.from("accounts").select(Columns.ALL) {
                filter {
                    eq("id", id)
                }
            }.decodeSingleOrNull<Account>()
            Result.success(account)
        } catch (e: PostgrestRestException) {
            logger.error("[AccountService]: Postgrest error getting account with ID: $id", e)
            Result.failure(AccountNotFoundException())
        } catch (e: Exception) {
            logger.error("[AccountService]: Error getting account with ID: $id", e)
            Result.failure(AccountNotFoundException())
        }
    }

    suspend fun createAccount(account: Account): Result<Account> {
        return try {
            val newAccount = supabase.from("accounts").insert(account).decodeSingle<Account>()
            Result.success(newAccount)
        } catch (e: PostgrestRestException) {
            logger.error("[AccountService]: Postgrest error creating account", e)
            Result.failure(AccountCreationFailedException(account))
        } catch (e: Exception) {
            logger.error("[AccountService]: Error creating account", e)
            Result.failure(AccountCreationFailedException(account))
        }
    }

    suspend fun updateAccount(account: Account): Result<Account> {
        return try {
            val updatedAccount = supabase.from("accounts").update(account) {
                filter {
                    eq("id", account.id)
                }
            }.decodeSingle<Account>()
            Result.success(updatedAccount)
        } catch (e: PostgrestRestException) {
            logger.error("[AccountService]: Postgrest error updating account", e)
            Result.failure(AccountUpdateFailedException(account))
        } catch (e: Exception) {
            logger.error("[AccountService]: Error updating account", e)
            Result.failure(AccountUpdateFailedException(account))
        }
    }

    suspend fun deleteAccount(id: String): Result<Boolean> {
        return try {
            supabase.from("accounts").delete {
                filter {
                    eq("id", id)
                }
            }
            Result.success(true)
        } catch (e: PostgrestRestException) {
            logger.error("[AccountService]: Postgrest error deleting account", e)
            Result.failure(AccountDeletionFailedException(id))
        } catch (e: Exception) {
            logger.error("[AccountService]: Error deleting account", e)
            Result.failure(AccountDeletionFailedException(id))
        }
    }
}