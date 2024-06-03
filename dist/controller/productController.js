"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecords = exports.getProductData = exports.addProductData = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const addProductData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, companyName, dueDate } = req.body;
        if (!products || !companyName || !dueDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProduct = new productModel_1.default({
            productName: products.map((product) => product.productName),
            productQuantity: products.map((product) => product.quantity),
            productRate: products.map((product) => product.rate),
            productAmount: products.map((product) => product.amount),
            companyName,
            dueDate,
        });
        yield newProduct.save();
        res.status(201).json({ message: 'Product data added successfully', product: newProduct });
    }
    catch (error) {
        console.error('Error adding product data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addProductData = addProductData;
const getProductData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
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
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProductData = getProductData;
const deleteRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productModel_1.default.deleteMany({});
    }
    catch (error) {
        console.error('Error deleting products:', error);
    }
});
exports.deleteRecords = deleteRecords;
