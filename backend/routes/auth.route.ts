import { Router } from "express";
import { fetchCurrentUser, signup } from "../controllers/auth.controller.ts";
import { validateSchema } from "../middlewares/validation.middleware.ts";
import { signUpSchema } from "../../shared/auth.schema.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";

const router = Router();


router.post("/signup", validateSchema(signUpSchema, "body"), signup);

router.get("/me", verifyToken ,fetchCurrentUser);

export default router;