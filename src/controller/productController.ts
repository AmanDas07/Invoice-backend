import { Request, Response } from 'express';
import Product from '../models/productModel';

export const addProductData = async (req: Request, res: Response) => {
    try {
        const { products, companyName, dueDate } = req.body;

        if (!products || !companyName || !dueDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = new Product({
            productName: products.map((product: any) => product.productName),
            productQuantity: products.map((product: any) => product.quantity),
            productRate: products.map((product: any) => product.rate),
            productAmount: products.map((product: any) => product.amount),
            companyName,
            dueDate,
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product data added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProductData = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'No products found' });
        }

        const companyName = products.length > 0 ? products[0].companyName : '';
        const dueDate = products.length > 0 ? products[0].dueDate : '';

        const responseData = {
            products: products.map(product => ({
                productName: product.productName,
                quantity: product.productQuantity,
                rate: product.productRate,
                amount: product.productAmount,
            })),
            companyName,
            dueDate,
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteRecords = async (req: Request, res: Response) => {
    try {
        await Product.deleteMany({});
    } catch (error) {
        console.error('Error deleting products:', error);
    }
};