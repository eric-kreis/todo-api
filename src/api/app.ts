import bodyParser from 'body-parser';
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connection from '../data/connection';
import firewall from '../infra/middlewares/firewall';
import RootInitializer from '../infra/routes/initializer';

const app = express();
const rootRouter = Router({ mergeParams: true });

// middlewares
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

export default app;
