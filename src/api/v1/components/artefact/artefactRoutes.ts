import { Router, Request, Response } from "express";
import { Artefact } from "./artefactModel";
import { createArtefact, deleteArtefact, getArtefactById, getArtefacts, updateArtefact } from "./artefactController";

const router = Router();

router.post("/artefact/project/:id", async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const artefact: Artefact = req.body;
    const createdArtefact = await createArtefact(artefact, projectId);
    res.status(201).json(createdArtefact);
  } catch (error) {
    console.error("Error with POST to /artefact/project/:id route:", error);
    res.status(500).send(error);
  }
});

router.get("/artefact/project/:id", async (req: Request, res: Response) => {
  try { 
    const projectId = req.params.id;
    const artefacts = await getArtefacts(projectId);
    res.status(200).json(artefacts);
  } catch (error) {
    console.error("Error with GET to /artefact/project/:id route:", error);
    res.status(500).send(error);
  }
});

router.get("/artefact/:artefactId/project/:projectId", async (req: Request, res: Response) => {
  try {
    const artefactId = req.params.artefactId;
    const projectId = req.params.projectId;
    const artefact = await getArtefactById(artefactId, projectId);
    res.status(200).json(artefact);
  } catch (error) {
    console.error("Error with GET to /artefact/:artefactId/project/:projectId route:", error);
    res.status(404).send(error);
  }
});

router.put("/artefact/:id", async (req: Request, res: Response) => {
  try {
    const artefactId = req.params.id;
    const data = req.body;
    const updatedArtefact = await updateArtefact(artefactId, data);
    res.status(200).json(updatedArtefact);
  } catch (error) {
    console.error("Error with PUT to /artefact/:id route:", error);
    res.status(500).send(error);
  }
});

router.delete("/artefact/:id", async (req: Request, res: Response) => {
  try {
    const artefactId = req.params.id;
    await deleteArtefact(artefactId);
    res.status(200).send({ message: `Artefact with ID ${artefactId} has been deleted.`, });
  } catch (error) {
    console.error("Error with DELETE to /artefact/:id route:", error);
    res.status(404).send(error);
  }
});

export default router;