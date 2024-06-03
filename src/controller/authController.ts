import { Request, Response } from 'express';
import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelper";
import userModel from "../models/userModel";
import JWT from 'jsonwebtoken';

interface RegisterBody {
    name: string;
    email: string;
    password: string;

}

export const registerController = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }


        // Check user
        const existingUser = await userModel.findOne({ email });

        // Existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};


//POST LOGIN
interface LoginBody {
    email: string;
    password: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export const loginController = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check user
        const user: User | null = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Token generation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,

            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};



