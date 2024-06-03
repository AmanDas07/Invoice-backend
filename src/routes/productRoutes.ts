
import { requireSignIn } from './../middlewares/authmiddleware';
import express, { Request, Response } from 'express';
import { addProductData, deleteRecords, getProductData } from '../controller/productController';


const router = express.Router();
router.post('/addProducts', requireSignIn, addProductData)
router.get('/getProductData', requireSignIn, getProductData)
router.delete('/deleteRecords', requireSignIn, deleteRecords)
export default router;