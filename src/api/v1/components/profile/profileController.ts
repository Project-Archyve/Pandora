import supabase from "../../config/supabaseConfig";
import { Profile } from "./profileModel";

export const getProfileById = async (id: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(
      `An error has occured when retrieving a profile: ${error.message}`
    );
  }

  if (data.length === 0) {
    throw new Error(`Profile with ID ${id} cannot be found.`);
  }

  return data[0];
};

export const updateProfile = async (
  id: string,
  data: Profile
): Promise<Profile> => {
  const { data: updatedProfile, error } = await supabase
    .from("profile")
    .update({
      displayName: data.displayName,
      pronouns: data.pronouns,
      avatarUrl: data.avatarUrl,
    })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(
      `An error has occured when updating a profile: ${error.message}`
    );
  }

  if (id === null) {
    throw new Error(`Profile with ID ${id} cannot be found.`);
  }

  return updatedProfile;
};
