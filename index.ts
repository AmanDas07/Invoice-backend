import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';
import authroutes from "../backend/src/routes/authRoutes"
import productroutes from "../backend/src/routes/productRoutes"
import cors from 'cors';
const app = express();

dotenv.config();

const corsOptions = {
    origin: 'https://invoice-frontend-1kcasd0sz-amandas07s-projects.vercel.app','https://invoice-frontend-uejh.onrender.com',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
};
app.use(express.json());
app.use(cors(corsOptions));



const routesDirectory: string = 'src/routes';
app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);


const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to Database");
    } catch (err) {
        console.error("Error connecting to the database", err);
    }
};


connectToDatabase();
const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${PORT}`);
});
