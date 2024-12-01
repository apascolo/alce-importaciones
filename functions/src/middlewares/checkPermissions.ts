import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/handleError';
import { db } from '../config/environment';
import { eCollentions, ePermissions } from '../enums/index';
import { IRole } from '../interfaces/index';

export const checkPermissions =
  (requiredPermission: ePermissions) => (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.body.authToken || req.query.authToken;

    if (authToken) {
      admin
        .auth()
        .verifyIdToken(authToken)
        .then(async (decodedToken) => {
          console.log(decodedToken);
          const { isSuperAdmin, roleId } = decodedToken;

          if (isSuperAdmin) return next();

          const role = await db.collection(eCollentions.Roles).doc(roleId).get();
          const { permissions } = role.data() as IRole;

          if (permissions.includes(requiredPermission)) return next();

          return res.status(401).send('Lo siento, no tienes permisos para realizar esta acción');
        })
        .catch((error) => {
          console.log(error);
          return res.status(401).send(handleError(error) || 'Lo siento, hubo un error al gestionar el token de acceso');
        });
    } else {
      return res.status(400).send('Lo siento, necesitas iniciar sesión para realizar esta acción');
    }
    return;
  };
