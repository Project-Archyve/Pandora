import { Router, Request, Response } from "express";
import { createAccount, deleteAccount, getAccountById, getAccounts, updateAccount } from "./accountController";
import { Account } from "./accountModel";

const router = Router()

router.post("/accounts", async (req: Request, res: Response) => {
    try {
        const account: Account = req.body
        const createdAccount = await createAccount(account)
        res.status(201).json(createdAccount);
    } catch (error) {
        console.error("Error with POST to /accounts route:", error)
        res.status(500).send(error)
    }
})

router.get("/accounts", async (_req: Request, res: Response) => {
    try {
        const accounts = await getAccounts()
        res.status(200).json(accounts)
    } catch (error) {
        console.error("Error with GET to /accounts route:", error)
        res.status(500).send(error)
    }
})

router.get("/accounts/:id", async (req: Request, res: Response) => {
    try {
        const accountId = req.params.id
        const account = await getAccountById(accountId)
        res.status(200).json(account)
    } catch (error) {
        console.error("Error with GET to /accounts/:id route:", error)
        res.status(404).send(error)
    }
})

router.put("/accounts/:id", async (req: Request, res: Response) => {
    try {
        const accountId = req.params.id
        const data = req.body
        const updatedAccount = await updateAccount(accountId, data)
        res.status(200).json(updatedAccount)
    } catch (error) {
        console.error("Error with PUT to /accounts/:id route:", error)
        res.status(500).send(error)
    }
})

router.delete("/accounts/:id", async (req: Request, res: Response) => {
    try {
        const accountId = req.params.id
        await deleteAccount(accountId)
        res.status(200).send({ message: `Account with ID ${accountId} has been deleted.` })
    } catch (error) {
        console.error("Error with DELETE to /accounts/:id route:", error)
        res.status(404).send(error)
    }
})

export default router