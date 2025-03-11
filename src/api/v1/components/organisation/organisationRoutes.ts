import { Router, Request, Response } from "express";
import {
  addUser,
  createOrganisation,
  deleteOrganisation,
  getOrganisationById,
  getOrganisations,
  removeUser,
  updateOrganisation,
} from "./organisationController";
import { Organisation } from "./organisationModel";

const router = Router();

router.post("/organisation", async (req: Request, res: Response) => {
  try {
    const organisation: Organisation = req.body;
    const createdOrganisation = await createOrganisation(organisation);
    res.status(201).json(createdOrganisation);
  } catch (error) {
    console.error("Error with POST to /organisation route:", error);
    res.status(500).send(error);
  }
});

router.get("/organisation", async (_req: Request, res: Response) => {
  try {
    const organisations = await getOrganisations();
    res.status(200).json(organisations);
  } catch (error) {
    console.error("Error with GET to /organisation route:", error);
    res.status(500).send(error);
  }
});

router.get("/organisation/:id", async (req: Request, res: Response) => {
  try {
    const organisationId = req.params.id;
    const organisation = await getOrganisationById(organisationId);
    res.status(200).json(organisation);
  } catch (error) {
    console.error("Error with GET to /organisation/:id route:", error);
    res.status(404).send(error);
  }
});

router.put("/organisation/:id", async (req: Request, res: Response) => {
  try {
    const organisationId = req.params.id;
    const data = req.body;
    const updatedOrganisation = await updateOrganisation(organisationId, data);
    res.status(200).json(updatedOrganisation);
  } catch (error) {
    console.error("Error with PUT to /organisation/:id route:", error);
    res.status(500).send(error);
  }
});

router.delete("/organisation/:id", async (req: Request, res: Response) => {
  try {
    const organisationId = req.params.id;
    await deleteOrganisation(organisationId);
    res.status(200).send({ message: `Organisation with ID ${organisationId} has been deleted.` });
  } catch (error) {
    console.error("Error with DELETE to /organisation/:id route:", error);
    res.status(404).send(error);
  }
});

router.post("/organisation/:organisationId/user/:userId", async (req: Request, res: Response) => {
  try {
    const { organisationId, userId } = req.params;
    await addUser(organisationId, userId);
    res.status(201).send({ message: `User ${userId} added to organisation ${organisationId}.` });
  } catch (error) {
    console.error("Error with POST to /organisation/:organisationId/user/:userId route:", error);
    res.status(500).send(error);
  }
});

router.delete("/organisation/:organisationId/user/:userId", async (req: Request, res: Response) => {
  try {
    const { organisationId, userId } = req.params;
    await removeUser(organisationId, userId);
    res.status(200).send({ message: `User ${userId} removed from organisation ${organisationId}.`, });
  } catch (error) {
    console.error("Error with DELETE to /organisation/:organisationId/user/:userId route:", error);
    res.status(500).send(error);
  }
});

export default router;
