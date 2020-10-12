import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { addressCheckRouter } from './routes/address-check';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';
import { calculateRouter } from './routes/calculate';
import { helloRouter } from './routes/hello';
import { registerRouter } from './routes/register';


const app = express();

// middleware
app.use(cors());
app.use(json());


// routers
app.use(addressCheckRouter);
app.use(calculateRouter);
app.use(helloRouter);
app.use(registerRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };