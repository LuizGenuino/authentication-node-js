import { Router } from "express";
import { fetchCurrentUser, signup, verifyEmail } from "../controllers/auth.controller.ts";
import { validateSchema } from "../middlewares/validation.middleware.ts";
import { signUpSchema, verifyEmailSchema } from "../../shared/auth.schema.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";

const router = Router();


router.post("/signup", validateSchema(signUpSchema, "body"), signup);

router.get("/me", verifyToken ,fetchCurrentUser);

router.post("/verify-email", verifyToken, validateSchema(verifyEmailSchema, "body"), verifyEmail)

export default router;