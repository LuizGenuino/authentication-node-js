import { Request, Response } from "express"
import UserModel from "../models/user.model.ts"
import { generateVerificationToken } from "../utils/auth.utils.ts"

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
    
    res.status(201).json({success: true, message: "User created successfully", data: newUser})

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error("An unknown error occurred")
        }
        res.status(500).json({success: false, message: "Internal server error"})
        
    }
}