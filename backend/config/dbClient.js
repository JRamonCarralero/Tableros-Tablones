import mongoose from 'mongoose';
import 'dotenv/config';

class dbClient {
    /**
     * Constructor to initialize the database connection
     * upon instantiation of the dbClient object.
     */
    constructor() {
        this.openConnectionDB();
    }

    /**
     * Opens a connection to a MongoDB instance using a connection string set in 
     * the MONGO_URL environment variable. This function is called automatically 
     * when an instance of the dbClient class is created.
     * @async
     */
    async openConnectionDB() {
        const queryString = process.env.MONGO_URL;
        await mongoose.connect(queryString);
    }

    /**
     * Closes the active connection to the MongoDB instance.
     * This function can be useful in scenarios where the application
     * needs to be shut down or the database connection needs to be
     * terminated.
     * @async
     */
    async closeConnectionDB() {
        try {
            await mongoose.disconnect();
        } catch (error) {
            console.log(error);
        }
    }
}

export default new dbClient();