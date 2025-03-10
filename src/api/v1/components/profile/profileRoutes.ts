import { Router, Request, Response } from "express";
import { getProfileById, updateProfile } from "./profileController";
import { Profile } from "./profileModel";

const router = Router()

router.get("/profile/:id", async (req: Request, res: Response) => {
    try {
        const profileId = req.params.id
        const profile = await getProfileById(profileId)
        res.status(200).json(profile)
    } catch (error) {
        console.error("Error with GET to /profile/:id route:", error)
        res.status(404).send(error)
    }
})

router.put("/profile/:id", async (req: Request, res: Response) => {
    try {
        const profileId = req.params.id
        const data = req.body
        const updatedProfile = await updateProfile(profileId, data)
        res.status(200).json(updateProfile)
    } catch (error) {
        console.error("Error with PUT to /profile/:id route:", error)
        res.status(500).send(error)
    }
})

export default router