import { Router, Request, Response } from "express";
import { createAccount, getAccount, getAccounts } from "../services/AccountService";
import { Account } from "../interface/Account";

const router = Router();

router.get("/accounts", async (_req: Request, res: Response) => {
    try {
        const accounts = await getAccounts();
        res.status(200).json(accounts)
    } catch (error) {
        console.error("Error in /accounts route:", error)
        res.status(500).send(error);
    }
});

router.get("/accounts/:id", async (req: Request, res: Response) => {
    try {
        const accountId = req.params.id;
        const account = await getAccount(accountId);
        res.status(200).json(account)
    } catch (error) {
        console.error("Error in /accounts/:id route", error);
        res.status(404).send(error);
    }
});

router.post("/accounts", async (req: Request, res: Response) => {
    try {
        const account: Account = req.body;
        const newAccount = await createAccount(account);
        res.status(201).json(newAccount); 
    } catch (error) {
        console.error("Error in /accounts route", error);
        res.status(500).send(error);
    }
});

router.put

router.delete

export default router;