import supabase from "../../config/supabaseConfig";
import { Artefact } from "./artefactModel";

export const createArtefact = async (artefact: Artefact, project_id: string): Promise<void> => {
  const { error } = await supabase
    .from("artefact")
    .insert({ ...artefact, project_id });
  
  if (error) {
    throw new Error(`An error has occured when creating an artefact: ${error.message}`);
  }
};

export const getArtefacts = async (project_id: string): Promise<Artefact[]> => {
  const { data, error } = await supabase
    .from("artefact")
    .select("*")
    .eq("project_id", project_id);

  if (error) {
    throw new Error(`An error has occured when retrieving artefacts: ${error.message}`);
  }

  return data;
};

export const getArtefactById = async (id: string, project_id: string): Promise<Artefact> => {
  const { data, error } = await supabase
    .from("artefact")
    .select("*")
    .eq("project_id", project_id);

  if (error) {
    throw new Error(`An error has occured when retrieving an artefact: ${error.message}`);
  }

  if (data.length === 0) {
    throw new Error(`Artefact with ID ${id} cannot be found.`);
  }

  return data[0];
};

export const updateArtefact = async (id: string, data: Artefact): Promise<Artefact> => {
  const { data: updatedData, error } = await supabase
    .from("artefact")
    .update({ title: data.title, body: data.body })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`An error has occured when updating an artefact: ${error.message}`);
  }

  if (id === null) {
    throw new Error(`Artefact with ID ${id} cannot be found.`);
  }

  return updatedData;
};

export const deleteArtefact = async (id: string): Promise<void> => {
  const { error } = await supabase.from("artefact").delete().eq("id", id);

  if (error) {
    throw new Error(`An error has occured when deleting an artefact: ${error.message}`);
  }
};