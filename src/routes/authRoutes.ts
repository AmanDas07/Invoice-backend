import express, { Request, Response } from 'express';
import { registerController, loginController } from '../controller/authController';


const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);



export default router;