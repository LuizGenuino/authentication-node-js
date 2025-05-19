import express, {Request, Response} from "express"
import { ENV } from "./utils/env.ts"
import { connectToDatabase } from "./utils/db.ts"
import router from "./routes/auth.route.ts"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { logger } from "./utils/logger.ts"
import { morganMiddleware } from "./controllers/morgan.middleware.ts"


const app = express()
const PORT = Number(ENV.PORT)

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morganMiddleware)

app.get("/health", (req: Request, res: Response) => {
    try {
        res.status(200).json({success: true, message: "Server is running"})
    } catch (error) {
        logger.error("Error in health check", error)
        res.status(500).json({success: false, message: "Server is not running"})
    }
})

app.use("/api/v1/auth", router)

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
    connectToDatabase()
})