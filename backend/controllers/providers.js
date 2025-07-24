import productModel from '../models/providers.js';

class productController {
    constructor() {}

    async create(req, res) {
        try {
            const data = await productModel.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

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

    async delete(req, res) {
        try {
            const { id } = req.params;
            const data = await productModel.delete(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAll(req, res) {
        try {
            const data = await productModel.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new productController();