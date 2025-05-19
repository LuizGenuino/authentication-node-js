import { Request, Response } from "express"
import UserModel from "../models/user.model.ts"
import { generateJWT, generateVerificationToken, setTokenCookie } from "../utils/auth.utils.ts"
import { sendVerificationEmail, sendWelcomeEmail } from "../services/mailtrap/mailtrap.service.ts"
import { UserDTO } from "../models/DTO/user.dto.ts"
import { logger } from "../utils/logger.ts"
import asyncHandler from "express-async-handler"
import { BadRequestError } from "../errors/badRequest.error.ts"
import { NotFoundError } from "../errors/notFound.error.ts"

export const signup = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const { name, email, password } = req.body

    logger.info("Started to signup a new user", { name, email })

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all required fields")
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    
    if (userAlreadyExists) {
        logger.info("User already exists", { email })
        throw new BadRequestError("User already exists")
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
})


export const fetchCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const user = await UserModel.findById(req.userId).select("-password");

    if (!user) {
        logger.debug("User not found", { userId: req.userId })
        throw new NotFoundError("User not found")
    }

    res.status(200).json({success: true, message: "User fetched successfully", data: UserDTO.toJson(user)})
})

export const verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { verificationToken } = req.body;

    if (!verificationToken) {        
        throw new BadRequestError("Please provide a verification token")
    }

    const user = await UserModel.findOne({ verificationToken, verificationTokenExpiresAt: {
        $gt: new Date() } }).select("-password");


    if (!user) {
        logger.debug("Invalid or expired verification token", { verificationToken })
        throw new NotFoundError("Invalid or expired verification token")
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    logger.info("Going to save the user after email verification")
    await user.save();
  
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({success: true, message: "Email verified successfully",  data: UserDTO.toJson(user)})
})