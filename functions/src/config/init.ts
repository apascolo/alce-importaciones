import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import serviceAccountData from '../../alce-importaciones-firebase-adminsdk-e1fl0-d6a55bc56a.json';

dotenv.config();

const serviceAccount: Record<string, string> = serviceAccountData;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FB_STORAGEBUCKET,
});
