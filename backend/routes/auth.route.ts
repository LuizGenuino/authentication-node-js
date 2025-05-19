import { Router } from "express";
import { fetchCurrentUser, resendVerificationEmail, signIn, signOut, signup, verifyEmail } from "../controllers/auth.controller.ts";
import { validateSchema } from "../middlewares/validation.middleware.ts";
import { signInSchema, signUpSchema, verifyEmailSchema } from "../../shared/auth.schema.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";

const router = Router();


router.post("/signup", validateSchema(signUpSchema, "body"), signup);

router.get("/me", verifyToken ,fetchCurrentUser);

router.post("/verify-email", verifyToken, validateSchema(verifyEmailSchema, "body"), verifyEmail)

router.post("/resend-verification-email", verifyToken, resendVerificationEmail)

router.post("/signout", verifyToken, signOut)

router.post("/signin", validateSchema(signInSchema, "body"),signIn)

export default router;