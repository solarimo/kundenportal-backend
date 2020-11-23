import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { addressCheckRouter } from './routes/address-check';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';
import { calculateRouter } from './routes/calculate';
import { helloRouter } from './routes/hello';
import { ibanCheckRouter } from './routes/iban-check';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { refreshTokenRouter } from './routes/refresh-token';


const app = express();

// middleware
app.use(cors());
app.use(json());


// routers
app.use(addressCheckRouter);
app.use(calculateRouter);
app.use(helloRouter);
app.use(ibanCheckRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(refreshTokenRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };