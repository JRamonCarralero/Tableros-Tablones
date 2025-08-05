import mongoose, { Schema } from "mongoose";

const ordersSchema = new mongoose.Schema(
    {
        products: {
            type: Array,
            required: true
        },
        provider: {
            //type: Schema.Types.ObjectId,
            type: String,
            //required: true
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