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
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
};
app.use(express.json());
app.use(cors(corsOptions));



const routesDirectory: string = 'src/routes';
app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);
/*fs.readdirSync(routesDirectory).map((fileName: string) => {
    const routePath: string = path.join(routesDirectory, fileName);
    import(routePath)
        .then((module) => app.use('/api', module.default || module))
        .catch((error) => console.error(`Error loading ${routePath}: ${error}`));
});*/

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
