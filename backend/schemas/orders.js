import mongoose, { Schema } from "mongoose";

const ordersSchema = new mongoose.Schema(
    {
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1 
            },
            price: {
                type: Number,
                required: true,
                min: 0 
            }
        }],
        provider: {
            type: Schema.Types.ObjectId,
            ref: 'Provider',
            required: true
        },
        user: {
            type: String,
            //required: true
        },
        date: {
            type: Date,
            //required: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", ordersSchema);