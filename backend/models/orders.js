import Order from "../schemas/orders.js";
import mongoose from "mongoose";

class OrdersModel {
    
    /**
     * Creates a new order.
     * 
     * This function receives a request containing order details in the body,
     * calls the model to create the order in the database, and sends a response
     * with the created order data and a status code of 201. If an error occurs,
     * it logs the error and sends a 500 status code with the error message.
     * 
     * @param {Object} order - The order details.
     * @returns {Promise<Object>} - The created order data.
     */
    async create(order) {
        return await Order.create(order);
    }

    /**
     * Gets all orders.
     * 
     * This function receives a request, calls the model to get all orders from the
     * database, and sends a response with the orders data and a status code of 200.
     * If an error occurs, it sends a 500 status code with the error message.
     * 
     * @returns {Promise<Object[]>} - The orders data.
     */
    async getAll() {
        return await Order.find().populate("products");
    }

    /**
     * Deletes an order.
     * 
     * This function receives an id as a parameter, calls the model to delete the
     * order from the database, and sends a response with the deleted order data
     * and a status code of 200. If an error occurs, it sends a 500 status code
     * with the error message.
     * 
     * @param {string} id - The id of the order to delete.
     * @returns {Promise<Object>} - The deleted order data.
     */
    async delete(id) {
        return await Order.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    /**
     * Updates an order.
     * 
     * This function receives an id and order details as parameters, calls the model
     * to update the order in the database, and sends a response with the updated
     * order data and a status code of 200. If an error occurs, it sends a 500
     * status code with the error message.
     * 
     * @param {string} id - The id of the order to update.
     * @param {Object} order - The order details.
     * @returns {Promise<Object>} - The updated order data.
     */
    async update(id, order) {
        return await Order.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            order,
            { new: true }
        );
    }
}

export default new OrdersModel();