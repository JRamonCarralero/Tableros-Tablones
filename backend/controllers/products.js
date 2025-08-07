import productModel from '../models/products.js';

class productController {
    constructor() {}

    /**
     * Creates a new product.
     * 
     * This function receives a request containing product details in the body,
     * calls the model to create the product in the database, and sends a response
     * with the created product data and a status code of 201. If an error occurs,
     * it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object containing the product details in the body.
     * @param {Object} res - The response object used to send the response.
     */
    async create(req, res) {
        try {
            const data = await productModel.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * Updates a product.
     * 
     * This function receives a request containing product details in the body and
     * an id parameter in the url, calls the model to update the product in the
     * database, and sends a response with the updated product data and a status
     * code of 200. If an error occurs, it logs the error and sends a 500 status
     * code with the error message.
     * 
     * @param {Object} req - The request object containing the product details in the body and the id in the params.
     * @param {Object} res - The response object used to send the response.
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = await productModel.update(id, req.body);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    /**
     * Deletes a product.
     * 
     * This function receives a request containing an id parameter in the URL,
     * calls the model to delete the product from the database, and sends a response
     * with the deleted product data and a status code of 200. If an error occurs,
     * it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object containing the id in the params.
     * @param {Object} res - The response object used to send the response.
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            const data = await productModel.delete(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * Gets all products.
     * 
     * This function receives a request, calls the model to get all products from the
     * database, and sends a response with the products data and a status code of 200.
     * If an error occurs, it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object used to send the response.
     */
    async getAll(req, res) {
        try {
            const data = await productModel.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * Gets products filtered by provider and/or name.
     * 
     * This function receives a request with query parameters provider and/or name,
     * calls the model to get the filtered products from the database, and sends a
     * response with the products data and a status code of 200. If an error occurs,
     * it sends a 500 status code with the error message.
     * 
     * @param {Object} req - The request object containing the query parameters.
     * @param {Object} res - The response object used to send the response.
     */
    async getFilteredProducts(req, res) {
        try {
            const params = req.query;
            const filters = {};
            if (params.provider) filters.provider = params.provider;
            if (params.name) {
                filters.name = { $regex: params.name, $options: 'i' };
            }
            const data = await productModel.getFilteredProducts(filters);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new productController();