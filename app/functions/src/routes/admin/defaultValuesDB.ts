import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const email = 'superuser@test-alce.com';

const createUserAdmin = async (_req: Request, res: Response) => {
  try {
    const userCreated = await admin.auth().createUser({
      email,
      emailVerified: true,
      password: 'password',
      displayName: 'Admin',
    });

    if (userCreated) {
      await admin.auth().setCustomUserClaims(userCreated.uid, { admin: true, role: 'admin' });
    }
    return res.send('Superuser created successfully');
  } catch (error) {
    console.log(error);
    return res.send('Has ocurred an error');
  }
};

export { createUserAdmin };
