/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { UserRouters } from './app/models/users/User.Route';
import notFound from './app/middlewares/notFound';
import { AuthRouters } from './app/models/Auth/Auth.Route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({ origin: 'https://manga-verse-chi.vercel.app', credentials: true }));

// Application routes

//product

// order

//users
app.use('/api/users', UserRouters);

//auth
app.use('/api/auth', AuthRouters);

//auth

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
