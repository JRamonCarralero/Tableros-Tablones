import Product from '../schemas/products.js';
import mongoose from 'mongoose';

class productsModel {

    async create(product) {
        return await Product.create(product);
    }

    async getAll() {
        return await Product.find();
    }

    async getOne(id) {
        return await Product.findById({_id: mongoose.Types.ObjectId(id)});
    }

    async update(id, product) {
        return await Product.updateOne({_id: mongoose.Types.ObjectId(id)}, product, {new: true});
    }

    async delete(id) {
        return await Product.deleteOne({_id: mongoose.Types.ObjectId(id)});
    }
}

export default new productsModel();