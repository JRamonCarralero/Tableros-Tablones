import mongoose from 'mongoose';
import 'dotenv/config';

class dbClient {
    constructor() {
        this.openConnectionDB();
    }

    async openConnectionDB() {
        const queryString = process.env.MONGO_URL;
        await mongoose.connect(queryString);
    }

    async closeConnectionDB() {
        try {
            await mongoose.disconnect();
        } catch (error) {
            console.log(error);
        }
    }
}

export default new dbClient();