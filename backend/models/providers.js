import Provider from '../schemas/providers.js';
import mongoose from 'mongoose';

class ProviderModel {

    async create(provider) {
        return await Provider.create(provider);
    }

    async getAll() {
        return await Provider.find();
    }

    async update(id, provider) {
        return await Provider.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, provider, {new: true});
    }

    async delete(id) {
        return await Provider.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }
}

export default new ProviderModel();