import express from "express";
import accountRoutes from "./routes/AccountRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", accountRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});