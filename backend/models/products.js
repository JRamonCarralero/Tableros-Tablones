import Product from '../schemas/products.js';
import mongoose from 'mongoose';

class productsModel {

    /**
     * Creates a new product.
     * 
     * This function receives a request containing product details,
     * calls the model to create the product in the database, and sends a response
     * with the created product data.
     * 
     * @param {Object} product - The product details to be created.
     * @returns {Promise<Object>} - A promise containing the created product data.
     */
    async create(product) {
        return await Product.create(product);
    }

    /**
     * Gets all products.
     * 
     * This function calls the model to retrieve all products from the database.
     * 
     * @returns {Promise<Array>} - A promise containing an array of product data.
     */
    async getAll() {
        return await Product.find();
    }

    /**
     * Updates a product.
     * 
     * This function receives a request containing product details and
     * an id parameter, calls the model to update the product in the
     * database, and sends a response with the updated product data.
     * 
     * @param {String} id - The id of the product to be updated.
     * @param {Object} product - The product details to be updated.
     * @returns {Promise<Object>} - A promise containing the updated product data.
     */
    async update(id, product) {
        return await Product.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, product, {new: true});
    }

    /**
     * Deletes a product.
     * 
     * This function receives a request containing an id parameter,
     * calls the model to delete the product from the database, and
     * sends a response with the deleted product data.
     * 
     * @param {String} id - The id of the product to be deleted.
     * @returns {Promise<Object>} - A promise containing the deleted product data.
     */
    async delete(id) {
        return await Product.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    /**
     * Gets filtered products.
     * 
     * This function receives a filters object, calls the model to find products
     * that match the given filters in the database, and returns the matching 
     * product data.
     * 
     * @param {Object} filters - The filters to apply for retrieving products.
     * @returns {Promise<Array>} - A promise containing an array of filtered product data.
     */
    async getFilteredProducts(filters) {
        return await Product.find(filters);
    }
}

export default new productsModel();