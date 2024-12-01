import './config/init';

import express, { Request, Response } from 'express';
import cors from 'cors';
import { eEndpoints, ePermissions } from './enums';
import * as ROUTES from './routes';
import * as functions from 'firebase-functions';
import { verifySuperAdminToken, checkPermissions } from './middlewares';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get(eEndpoints.Root, (_: Request, res: Response) => {
  return res.send(`Server ok! ${process.env.APP_NAME} is running! :D`);
});

/** **************************************************
                ADMIN ROUTES
****************************************************/
app.get(eEndpoints.CreateUserAdmin, verifySuperAdminToken, ROUTES.createUserAdmin);
app.get(eEndpoints.SetStatistics, verifySuperAdminToken, ROUTES.setStatisticsDefaultValues);

/** **************************************************
                ENTITIES ROUTES
****************************************************/
app.post(eEndpoints.Suppliers, checkPermissions(ePermissions.CreateSuppliers), ROUTES.createEntity);
app.put(`${eEndpoints.Suppliers}/:id`, checkPermissions(ePermissions.UpdateSuppliers), ROUTES.updateEntity);
app.delete(`${eEndpoints.Suppliers}/:id`, checkPermissions(ePermissions.SoftDeleteSuppliers), ROUTES.softDeleteEntity);

app.post(eEndpoints.Customers, checkPermissions(ePermissions.CreateCustomers), ROUTES.createEntity);
app.put(`${eEndpoints.Customers}/:id`, checkPermissions(ePermissions.UpdateCustomers), ROUTES.updateEntity);
app.delete(`${eEndpoints.Customers}/:id`, checkPermissions(ePermissions.SoftDeleteCustomers), ROUTES.softDeleteEntity);

exports.entityCreated = ROUTES.entityCreated;
exports.entityUpdate = ROUTES.entityUpdate;
exports.entityDeleted = ROUTES.entityDeleted;

/** **************************************************
                ROLES ROUTES
****************************************************/
app.post(eEndpoints.Roles, checkPermissions(ePermissions.CreateRoles), ROUTES.createRole);
app.put(`${eEndpoints.Roles}/:id`, checkPermissions(ePermissions.UpdateRoles), ROUTES.updateRole);
app.delete(`${eEndpoints.Roles}/:id`, checkPermissions(ePermissions.DeleteRoles), ROUTES.deleteRole);

exports.roleCreated = ROUTES.roleCreated;
exports.roleDeleted = ROUTES.roleDeleted;

// START API
exports.api = functions.https.onRequest(app);
