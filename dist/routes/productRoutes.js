"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authmiddleware_1 = require("./../middlewares/authmiddleware");
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.post('/addProducts', authmiddleware_1.requireSignIn, productController_1.addProductData);
router.get('/getProductData', authmiddleware_1.requireSignIn, productController_1.getProductData);
router.delete('/deleteRecords', authmiddleware_1.requireSignIn, productController_1.deleteRecords);
exports.default = router;
