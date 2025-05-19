import { Request, Response } from "express"
import UserModel from "../models/user.model.ts"
import { generateJWT, generateVerificationToken, setTokenCookie } from "../utils/auth.utils.ts"
import { sendVerificationEmail } from "../services/mailtrap/mailtrap.service.ts"
import { UserDTO } from "../models/DTO/user.dto.ts"
import { logger } from "../utils/logger.ts"

export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body

    logger.info("Started to signup a new user", { name, email })

    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "Please provide all required fields"})
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    
    if (userAlreadyExists) {
        logger.info("User already exists", { email })
        return res.status(400).json({success: false, message: "User already exists"})
    }

    const verificationToken = generateVerificationToken();
    logger.info("Verification token generated", { verificationToken })

    const newUser = new UserModel({
        name,
        email,
        password,
        verificationToken
    });

    logger.info("Going to save the new user", { newUser })
    await newUser.save();

    logger.info("Gerenating JWT Token and setting cookie");
    const token = generateJWT(newUser._id.toString());
    setTokenCookie(res, token);

    logger.info("Sending verification email");
    await sendVerificationEmail(email, verificationToken);
    
    res.status(201).json({success: true, message: "User created successfully", data: UserDTO.toJson(newUser)})

    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error("Error signing up a new user", error.message)
        } else {
            logger.error("An unknown error occurred")
        }
        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}