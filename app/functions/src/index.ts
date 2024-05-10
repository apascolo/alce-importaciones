import './config/init';

import express, { Request, Response } from 'express';
import cors from 'cors';
import { eEndpoints } from './enums';
import * as ROUTES from './routes';
import * as functions from 'firebase-functions';
import { verifyAdminToken } from './middlewares';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get(eEndpoints.Root, (_: Request, res: Response) => {
  return res.send(`Server ok! ${process.env.APP_NAME} is running! :D`);
});

/** **************************************************
                ADMIN ROUTES
****************************************************/
app.get(eEndpoints.CreateUserAdmin, ROUTES.createUserAdmin);
app.get(eEndpoints.SetStatistics, ROUTES.setStatisticsDefaultValues);

/** **************************************************
                ENTITIES ROUTES
****************************************************/
app.post(eEndpoints.Entities, verifyAdminToken, ROUTES.createEntity);
app.put(`${eEndpoints.Entities}/:id`, verifyAdminToken, ROUTES.updateEntity);
app.delete(`${eEndpoints.Entities}/:id`, verifyAdminToken, ROUTES.softDeleteEntity);

exports.entityCreated = ROUTES.entityCreated;
exports.entityDeleted = ROUTES.entityDeleted;

// START API
exports.api = functions.https.onRequest(app);
