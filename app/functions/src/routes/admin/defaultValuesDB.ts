import { Request, Response } from 'express';
import { admin } from '../../config/environment';

const createUserAdminTest = async (_req: Request, res: Response) => {
  try {
    const userCreated = await admin.auth().createUser({
      email: 'superuser@test-alce.com',
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

export { createUserAdminTest };
