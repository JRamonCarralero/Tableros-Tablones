import ordersModel from '../models/orders.js';

class ordersController {
    constructor() {}

    
    /**
     * Creates a new order and updates the stock of the products.
     * 
     * This function receives a request containing order details in the body,
     * calls the model to create the order in the database, 
     * updates the stock of the products and sends a response
     * with the created order data and a status code of 201. If an error occurs,
     * it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object containing the order details in the body.
     * @param {Object} res - The response object used to send the response.
     */
    async create(req, res) {
        try {
            const { products, provider, user, date } = req.body;
            const productsToUpdate = products.map(p => {
                return {id: p.product._id, quantity: p.quantity};
            });

            const newOrder = {
                products: products.map(p => {
                    return {product: p.product._id, quantity: p.quantity, price: p.price};
                }),
                provider,
                user,
                date
            };

            await Promise.all(productsToUpdate.map(async p => {
                await ordersModel.updateProduct(p.id, p.quantity);
            }));

            const data = await ordersModel.create(newOrder);
            res.status(201).json(data);
        } catch (error) {
            console.log('error', error);
            res.status(500).send(error);
        }
    }

    /**
     * Updates an order.
     * 
     * This function receives a request containing order details in the body and
     * an id parameter in the url, calls the model to update the order in the
     * database, and sends a response with the updated order data and a status
     * code of 200. If an error occurs, it logs the error and sends a 500 status
     * code with the error message.
     * 
     * @param {Object} req - The request object containing the order details in the body and the id in the params.
     * @param {Object} res - The response object used to send the response.
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = await ordersModel.update(id, req.body);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    /**
     * Deletes an order.
     * 
     * This function receives a request containing an id parameter in the URL,
     * calls the model to delete the order from the database, and sends a response
     * with the deleted order data and a status code of 200. If an error occurs,
     * it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object containing the id in the params.
     * @param {Object} res - The response object used to send the response.
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            const orderToDelete = await ordersModel.getOne(id);
            await Promise.all(orderToDelete.products.map(async p => {
                await ordersModel.updateProduct(p.product, p.quantity, true);
            }));

            const data = await ordersModel.delete(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * Gets all orders.
     * 
     * This function receives a request, calls the model to get all orders from the
     * database, and sends a response with the orders data and a status code of 200.
     * If an error occurs, it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object used to send the response.
     */
    async getAll(req, res) {
        try {
            const data = await ordersModel.getAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

export default new ordersController();