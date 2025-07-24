import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';
import cors from 'cors';

import routerProducts from './routes/products.js';
import routerProviders from './routes/providers.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/products', routerProducts);
app.use('/providers', routerProviders);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
} catch (error) {
    console.log(error);
}

process.on('SIGINT', async () => {
    await dbClient.closeConnectionDB();
    process.exit(0);
});