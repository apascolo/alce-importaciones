import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/handleError';

export const verifySuperAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.body.authToken || req.query.authToken;
  if (authToken) {
    admin
      .auth()
      .verifyIdToken(authToken)
      .then((decodedToken) => {
        console.log(decodedToken);
        if (!decodedToken.isSuperAdmin) {
          return res.status(401).send('Lo siento, esta acción solo está permitida para súper administradores');
        }
        req.body.isSuperAdmin = true;
        req.body.userId = decodedToken.uid;
        next();
        return;
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
