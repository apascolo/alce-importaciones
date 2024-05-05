import { functions, useEmulators } from './config/environment';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { eEndpoints } from './enums';
import * as ROUTES from './routes';
// import { verifyAdminToken, verifyClientToken, verifyToken } from './middlewares';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get(eEndpoints.Root, (_: Request, res: Response) => {
  return res.send(`Server ok! ${process.env.APP_NAME} is running! :D`);
});

/** **************************************************
                ADMIN ROUTES
****************************************************/

// DB ENDPOINTS
if (useEmulators) {
  app.get(eEndpoints.CreateUserAdminTest, ROUTES.createUserAdminTest);
}

// START API
exports.api = functions.https.onRequest(app);
