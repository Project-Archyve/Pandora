import supabase from "../../config/supabaseConfig";
import { Organisation } from "./organisationModel";

export const createOrganisation = async (organisation: Organisation): Promise<void> => {
  const { error } = await supabase.from("organisation").insert(organisation);

  if (error) {
    throw new Error(`An error has occured when creating an organisation: ${error.message}`);
  }
};

export const getOrganisations = async (): Promise<Organisation[]> => {
  const { data, error } = await supabase.from("organisation").select("*");

  if (error) {
    throw new Error(`An error has occured when retrieving organisations: ${error.message}`);
  }

  return data;
};

export const getOrganisationById = async (id: string): Promise<Organisation> => {
  const { data, error } = await supabase
    .from("organisation")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(`An error has occured when retrieving an organisation: ${error.message}`);
  }

  if (data.length === 0) {
    throw new Error(`Organisation with ID ${id} cannot be found.`);
  }

  return data[0];
};

export const updateOrganisation = async (id: string, data: Organisation): Promise<Organisation> => {
  const { data: updatedData, error } = await supabase
    .from("organisation")
    .update({ name: data.name, description: data.description })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`An error has occured when updating an organisation: ${error.message}`);
  }

  if (id === null) {
    throw new Error(`Organisation with ID ${id} cannot be found.`);
  }

  return updatedData;
};

export const deleteOrganisation = async (id: string): Promise<void> => {
  const { error } = await supabase.from("organisation").delete().eq("id", id);

  if (error) {
    throw new Error(`An error has occured when deleting an organisation: ${error.message}`);
  }
};

export const addUser = async (organisationId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from("organisation_user")
    .insert([{ organisation_id: organisationId, user_id: userId }]);

  if (error) {
    throw new Error(`An error occured while adding user to organisation: ${error.message}`);
  }
};

export const removeUser = async (organisationId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from("organisation_user")
    .delete()
    .eq("organisation_id", organisationId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`An error has occured whilst removing user from organisation: ${error.message}`);
  }
};