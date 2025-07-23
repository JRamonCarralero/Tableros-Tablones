import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, "El precio no puede ser negativo"]
        },
        stock: {
            type: Number,
            required: true,
            min: [0, "El stock no puede ser negativo"]
        },
        featured: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            required: true
        },
        height: {
            type: Number,
            min: [0, "La altura no puede ser negativa"]
        },
        width: {
            type: Number,
            min: [0, "El ancho no puede ser negativo"]
        },
        thickness: {
            type: Number,
            min: [0, "El grosor no puede ser negativo"]
        }
    }
);

export default mongoose.model("Product", productSchema);