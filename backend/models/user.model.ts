import mongoose from "mongoose";
import type { User } from "../../shared/user.type.ts";
import bcrypt from "bcryptjs";
import { calculateTokenExpiry } from "../utils/auth.utils.ts";
import { ENV } from "../utils/env.ts";

const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: Number(ENV.MIN_PASSWORD_LENGTH) || 8 },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, required: true, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date }
}, { timestamps: true});

// Middleware to hash password before saving the user
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(Number(ENV.BCRYPT_SALT_ROUNDS) || 10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.verificationToken && !this.verificationTokenExpiresAt) {
        this.verificationTokenExpiresAt = calculateTokenExpiry(24); // 24 hours
    }

    if (this.resetPasswordToken && !this.resetPasswordExpiresAt) {
        this.resetPasswordExpiresAt = calculateTokenExpiry(24); // 24 hours
    }

    next();
})

const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;