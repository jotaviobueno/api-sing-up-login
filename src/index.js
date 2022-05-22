import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/v1.js';

const app = express();

dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router);

mongoose.connect(process.env.DB_HOST).then(() => {
    console.log('Connected to mongoose');
    app.listen(8081, () => {
        console.log('Listening on');
    });
});