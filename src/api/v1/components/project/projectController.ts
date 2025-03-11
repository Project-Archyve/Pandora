import supabase from "../../config/supabaseConfig";
import { Project } from "./projectModel";

export const createProject = async (project: Project, organisation_id: string): Promise<void> => {
  const { error } = await supabase
    .from("project")
    .insert({ ...project, organisation_id });

  if (error) {
    throw new Error(`An error has occurred when creating a project: ${error.message}`);
  }
};

export const getProjects = async (organisation_id: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("organisation_id", organisation_id);

  if (error) {
    throw new Error(`An error has occurred when retrieving projects: ${error.message}`);
  }

  return data;
};

export const getProjectById = async (id: string, organisation_id: string): Promise<Project> => {
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("organisation_id", organisation_id);

  if (error) {
    throw new Error(`An error has occured when retrieving a project: ${error.message}`);
  }

  if (data.length === 0) {
    throw new Error(`Project with ID ${id} cannot be found.`);
  }

  return data[0];
};

export const updateProject = async (id: string, data: Project): Promise<Project> => {
  const { data: updatedData, error } = await supabase
    .from("project")
    .update({ title: data.title, description: data.description })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`An error has occured when updating a project: ${error.message}`);
  }

  if (id === null) {
    throw new Error(`Project with ID ${id} cannot be found.`);
  }

  return updatedData;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from("project").delete().eq("id", id);

  if (error) {
    throw new Error(`An error has occured when deleting a project: ${error.message}`);
  }
};

