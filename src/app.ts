/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Application routes

app.use('/api/v1', router);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Sadik !');
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

// Not Found middleware
app.use(notFound);

export default app;
