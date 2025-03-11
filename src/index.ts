import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import profileRoutes from "./api/v1/components/profile/profileRoutes";
import organisationRoutes from "./api/v1/components/organisation/organisationRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const apiRoute: string = "/api/v1";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(apiRoute, profileRoutes);
app.use(apiRoute, organisationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
