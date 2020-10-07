import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { addressCheckRouter } from './routes/address-check';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';
import { calculateRouter } from './routes/calculate';

export const API_PREFIX = '/api/v1';
const app = express();

// middleware
app.use(cors());
app.use(json());


// routers
app.use(addressCheckRouter);
app.use(calculateRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };