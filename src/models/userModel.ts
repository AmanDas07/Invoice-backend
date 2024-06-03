import mongoose from "mongoose";

interface User {
    name: string;
    email: string;
    password: string;

}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model<User>('users', userSchema);