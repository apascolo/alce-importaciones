import express, { Request, Response } from 'express';
import cors from 'cors';
import { eEndpoints } from './enums';
import * as ROUTES from './routes';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import serviceAccountData from '../alce-importaciones-firebase-adminsdk-e1fl0-d6a55bc56a.json';
import { verifyAdminToken } from '@middlewares/verifyAdmin';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

dotenv.config();

const serviceAccount: Record<string, string> = serviceAccountData;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FB_STORAGEBUCKET,
});

app.get(eEndpoints.Root, (_: Request, res: Response) => {
  return res.send(`Server ok! ${process.env.APP_NAME} is running! :D`);
});

/** **************************************************
                ADMIN ROUTES
****************************************************/
app.get(eEndpoints.CreateUserAdmin, ROUTES.createUserAdmin);

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
