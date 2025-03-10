import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import accountRoutes from "./api/v1/components/account/accountRoutes"
import organisationRoutes from "./api/v1/components/organisation/organisationRoutes"

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}))

app.use("/api/v1", accountRoutes)
app.use("/api/v1", organisationRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

export default app