import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
    productName: string[];
    productQuantity: number[];
    productRate: number[];
    productAmount: number[];
    companyName: string[];
    dueDate: Date[];
}

const productSchema = new Schema<Product>({
    productName: {
        type: [String],
        required: true,
        trim: true,
    },
    productQuantity: {
        type: [Number],
        required: true,
    },
    productRate: {
        type: [Number],
        required: true,
    },
    productAmount: {
        type: [Number],
        required: true,
    },
    companyName: {
        type: [String],
        required: true,
        trim: true,
    },
    dueDate: {
        type: [Date],
        required: true,
    },

}, { timestamps: true });


export default mongoose.model<Product>('Product', productSchema);
