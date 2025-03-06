import supabase from "../../config/supabaseConfig"
import { Account } from "./accountModel"

export const createAccount = async (account: Account): Promise<void> => {
    const { error } = await supabase
      .from("account")
      .insert(account)

    if (error) {
        throw new Error(`An error has occured when creating an account: ${error.message}`)
    }
}

export const getAccounts = async (): Promise<Account[]> => {
    const { data, error } = await supabase
      .from("account")
      .select("*")

    if (error) {
        throw new Error(`An error has occured when retrieving accounts: ${error.message}`)
    }

    return data
}

export const getAccountById = async (id: string): Promise<Account> => {
    const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("id", id)
    
    if (error) {
        throw new Error(`An error has occured when retrieving an account: ${error.message}`)
    }

    if (data.length === 0) {
        throw new Error(`Account with ID ${id} cannot be found.`)
    }

    return data[0]
}

export const updateAccount = async (id: string, data: Account): Promise<Account> => {
    const { data: updatedData, error } = await supabase
      .from("account")
      .update({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password 
      })
      .eq("id", id)
      .single()

      if (error) {
          throw new Error(`An error has occured when updating an account: ${error.message}`)
      }

      if (id === null) {
          throw new Error(`Account with ID ${id} cannot be found.`)
      }

      return updatedData
}

export const deleteAccount = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("account")
      .delete()
      .eq("id", id)

    if (error) {
        throw new Error(`An error has occured when deleting an account: ${error.message}`)
    }
}