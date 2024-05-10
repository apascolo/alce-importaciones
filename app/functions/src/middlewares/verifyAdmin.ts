import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { handleError } from 'src/utils';

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.body.authToken || req.query.authToken;
  if (authToken) {
    admin
      .auth()
      .verifyIdToken(authToken)
      .then((decodedToken) => {
        // ! verificar que claims llegan, a ver si se puede validar el role = admin
        console.log(decodedToken);
        if (!decodedToken.admin) {
          return res.status(401).send('Lo siento, esta acción solo está permitida para administradores');
        }
        req.body.isAdmin = true;
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
