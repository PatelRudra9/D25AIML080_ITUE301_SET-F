import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use('/api/v1', apiRouter);
app.use((req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found.' } }));
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGODB_URI;

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be set in .env');
if (!mongoUri) throw new Error('MONGODB_URI must be set in .env');

mongoose.connect(mongoUri)
  .then(() => {
    app.listen(port, () => console.log(`EventHub API listening on port ${port}`));
  })
  .catch((error) => {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exitCode = 1;
  });
