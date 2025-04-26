import express, {Request, Response} from "express"
import { ENV } from "./utils/env.ts"


const app = express()
const PORT = Number(ENV.PORT)

app.get("/health", (req: Request, res: Response) => {
    try {
        res.status(200).json({success: true, message: "Server is running"})
    } catch (error) {
        res.status(500).json({success: false, message: "Server is not running"})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})