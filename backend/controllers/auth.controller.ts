import { Request, Response } from "express"
import UserModel from "../models/user.model.ts"
import { generateJWT, generateVerificationToken, setTokenCookie } from "../utils/auth.utils.ts"
import { sendVerificationEmail } from "../services/mailtrap/mailtrap.service.ts"
import { UserDTO } from "../models/DTO/user.dto.ts"

export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "Please provide all required fields"})
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    
    if (userAlreadyExists) {
        return res.status(400).json({success: false, message: "User already exists"})
    }

    const verificationToken = generateVerificationToken();

    const newUser = new UserModel({
        name,
        email,
        password,
        verificationToken
    });

    await newUser.save();

    console.log("Gerenating JWT Token and setting cookie");
    const token = generateJWT(newUser._id.toString());
    setTokenCookie(res, token);

    console.log("Sending verification email");
    await sendVerificationEmail(email, verificationToken);
    
    res.status(201).json({success: true, message: "User created successfully", data: UserDTO.toJson(newUser)})

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error("An unknown error occurred")
        }
        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}