import { Router, Request, Response } from "express";
import { Project } from "./projectModel";
import { 
  createProject, 
  deleteProject, 
  getProjectById, 
  getProjects, 
  updateProject 
} from "./projectController";

const router = Router();

router.post("/project/organisation/:id", async (req: Request, res: Response) => {
  try {
    const organisationId = req.params.id;
    const project: Project = req.body;
    const createdProject = await createProject(project, organisationId);
    res.status(201).json(createdProject);
  } catch (error) {
    console.error("Error with POST to /project/organisation/:id route:", error);
    res.status(500).send(error);
  }
});

router.get("/project/organisation/:id", async (req: Request, res: Response) => {
  try {
    const organisationId = req.params.id;
    const projects = await getProjects(organisationId);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error with GET to /project/organisation/:id route:", error);
    res.status(500).send(error);
  }
});

router.get("/project/:projectId/organisation/:organisationId", async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const organisationId = req.params.organisationId;
    const project = await getProjectById(projectId, organisationId);
    res.status(200).json(project);
  } catch (error) {
    console.error("Error with GET to /project/:projectId/organisation/:organisationId route:", error);
    res.status(404).send(error);
  }
});

router.put("/project/:id", async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    const updatedProject = await updateProject(projectId, data);
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error with PUT to /project/:id route:", error);
    res.status(500).send(error);
  }
});

router.delete("/project/:id", async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    await deleteProject(projectId);
    res.status(200).send({ message: `Project with ID ${projectId} has been deleted.`, });
  } catch (error) {
    console.error("Error with DELETE to /project/:id route:", error);
    res.status(404).send(error);
  }
});

export default router;