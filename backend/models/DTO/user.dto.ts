import mongoose from "mongoose";
import  type {User} from "../../../shared/user.type.ts"


export class UserDTO {
    static toJson(user: mongoose.Document & User): Omit<User, "password" | "verificationToken" | 
    "verificationTokenExpiresAt" | "resetPasswordToken" | 
    "resetPasswordTokenExpiresAt"> | null {
        if(!user) {
            return null;
        }

        const {
            password,
            verificationToken,
            verificationTokenExpiresAt,
            resetPasswordToken,
            resetPasswordTokenExpiresAt,
            ...safeData
        } = user.toObject();
        
        return safeData

    }
}
