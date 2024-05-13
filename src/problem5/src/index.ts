import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { pagination } from 'typeorm-pagination';
import router from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { ErrorResponse } from './core/errorResponse';

dotenv.config();

const PORT = process.env.PORT || 9000;

const app = express();

app.use(process.env.NODE_ENV === 'dev' ? morgan('dev') : morgan('combined'));
app.use(helmet());
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(pagination);

app.use('', router);
app.get('/', (_, res) => {
  res.status(200).json({
    success: true,
    message:
      'You are on node-typescript-boilderplate. You should not have further access from here.',
  });
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  (error as any).code = 404;
  next(error);
});

app.use(
  (error: ErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
    const code = error.code || 500;
    const errors = error.errors || [];

    return res.status(code).send({
      code,
      status: 'error',
      message: error.message,
      ...(errors.length > 0 && { errors }),
    });
  }
);

createConnection()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`CONNECTED TO DB AND SERVER STARTED ON PORT  ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
