import express, {Request, Response} from "express"
import { ENV } from "./utils/env.ts"
import { connectToDatabase } from "./utils/db.ts"
import router from "./routes/auth.route.ts"


const app = express()
const PORT = Number(ENV.PORT)

app.use(express.json())

app.get("/health", (req: Request, res: Response) => {
    try {
        res.status(200).json({success: true, message: "Server is running"})
    } catch (error) {
        res.status(500).json({success: false, message: "Server is not running"})
    }
})

app.use("/api/v1/auth", router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    connectToDatabase()
})