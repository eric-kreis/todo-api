import bodyParser from 'body-parser';
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connection from '../data/connection';
import { error, firewall } from '../infra/middlewares';
import RootInitializer from '../infra/routes/initializer';

const app = express();
const rootRouter = Router({ mergeParams: true });

// middlewares;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(firewall);

// initialize routes;
const rootInitializer = new RootInitializer(rootRouter, connection);
rootInitializer.handle();

// router;
app.use(rootRouter);

// error middleware;
app.use(error);

export default app;
