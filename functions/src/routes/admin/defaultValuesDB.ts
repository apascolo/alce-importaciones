import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const email = 'superadmin@test-alce.com';

const createUserAdmin = async (_req: Request, res: Response) => {
  try {
    const userCreated = await admin.auth().createUser({
      email,
      emailVerified: true,
      password: 'password',
      displayName: 'Admin',
    });

    if (userCreated) {
      await admin.auth().setCustomUserClaims(userCreated.uid, { isSuperAdmin: true, roleId: 'superadmin' });
    }
    return res.send('Superadmin created successfully');
  } catch (error) {
    console.log(error);
    return res.send('Has ocurred an error');
  }
};

export { createUserAdmin };
