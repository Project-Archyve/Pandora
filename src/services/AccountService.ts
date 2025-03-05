import supabase from "../config/SupabaseConfig";
import { Account } from "../interface/Account";

const handleError = (error: any, message: string) => {
  console.error(message, error);
  throw error;
};

export const getAccounts = async () => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*');

  if (error) {
    handleError(error, "Error fetching accounts:");
  }

  console.log("Fetched accounts:", data);
  return data;
};

export const getAccount = async (id: string) => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', id);

  if (error) {
    handleError(error, "Error fetching account:");
  }

  console.log("Fetched account:", data);
  return data;
};

export const createAccount = async (account: Account) => {
  const { data, error } = await supabase
    .from('accounts')
    .insert(account);

  if (error) {
    handleError(error, "Error creating account:");
  }

  console.log("Created account", account.email);
  return data;
};

export const updateAccount = async (account: Account) => {
  const { data, error } = await supabase
    .from('accounts')
    .update(account)
    .eq('id', account.id);

  if (error) {
    handleError(error, "Error updating account:");
  }

  console.log("Updated account", account.id);
  return data;
};

export const deleteAccount = async (id: string) => {
  const { data, error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', id);

  if (error) {
    handleError(error, "Error deleting account:");
  }

  console.log("Deleted account", id);
  return data;
};