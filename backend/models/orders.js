import Order from "../schemas/orders.js";
import mongoose from "mongoose";

class OrdersModel {
    
    async create(order) {
        return await Order.create(order);
    }

    async getAll() {
        return await Order.find();
    }

    async delete(id) {
        return await Order.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    async update(id, order) {
        return await Order.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            order,
            { new: true }
        );
    }
}

export default new OrdersModel();