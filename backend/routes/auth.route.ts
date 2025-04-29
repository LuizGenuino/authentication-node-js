import { Router } from "express";
import { signup } from "../controllers/auth.controller.ts";
import { validateSchema } from "../middlewares/validation.middleware.ts";
import { signUpSchema } from "../../shared/auth.schema.ts";

const router = Router();


router.post("/signup", validateSchema(signUpSchema, "body"), signup);

export default router;