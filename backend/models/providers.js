import Provider from '../schemas/providers.js';
import mongoose from 'mongoose';

class ProviderModel {

    /**
     * Creates a new provider.
     * @param {Object} provider - The provider to be created.
     * @returns {Promise<Provider>} The created provider.
     */
    async create(provider) {
        return await Provider.create(provider);
    }

    /**
     * Retrieves all providers.
     * @returns {Promise<Array<Provider>>} A promise that resolves to an array of all providers.
     */
    async getAll() {
        return await Provider.find();
    }

    /**
     * Updates a provider.
     * @param {string} id - The ID of the provider to be updated.
     * @param {Object} provider - The provider to be updated.
     * @returns {Promise<Provider>} The updated provider.
     */
    async update(id, provider) {
        return await Provider.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, provider, {new: true});
    }

    /**
     * Deletes a provider.
     * @param {string} id - The ID of the provider to be deleted.
     * @returns {Promise<Provider>} The deleted provider.
     */
    async delete(id) {
        return await Provider.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }
}

export default new ProviderModel();