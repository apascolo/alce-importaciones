import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { Timestamp } from 'firebase-admin/firestore';
import { deleteObject, ref as refStorage, getStorage, connectStorageEmulator } from 'firebase/storage';
import serviceAccountData from '../../adminsdk/alce-importaciones-firebase-adminsdk-e1fl0-d6a55bc56a.json';
// import { IBillingData, IMenu, IOrder, IPaymentMethod, IProduct, IRestaurant, ITotalDB, IUser } from '../types';
// import { COLLECTIONS } from '../utils';

dotenv.config();

const serviceAccount: Record<string, string> = serviceAccountData;
const EMULATORS = process.env.USE_EMULATORS || '';
const useEmulators = Boolean(EMULATORS.length);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FB_STORAGEBUCKET,
});

const environment = {
  firebase: {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    storageBucket: process.env.FB_STORAGEBUCKET,
    projectId: process.env.FB_PROJECTID,
    messagingSenderId: process.env.FB_MESSAGING_SENDERID,
    appId: process.env.FB_APPID,
    // measurementId: process.env.FB_MEASUREMENTID,
  },
  algolia: {
    id: process.env.ALGOLIA_ID || '',
    adminKey: process.env.ALGOLIA_ADMIN_KEY || '',
  },
};

// const converter = <T>() => ({
//   toFirestore: (data: Partial<T>) => data,
//   fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T,
// });

// const dataPoint = <T>(collectionPath: string) => {
//   return admin.firestore().collection(collectionPath).withConverter(converter<T>());
// };

const db = {
  batch: admin.firestore().batch(),
  // billingData: dataPoint<IBillingData>(COLLECTIONS.billingData),
  // configs: dataPoint<ITotalDB>(COLLECTIONS.configs.collection),
  // menus: dataPoint<IMenu>(COLLECTIONS.menus),
  // methods: dataPoint<IPaymentMethod>(COLLECTIONS.methods),
  // orders: dataPoint<IOrder>(COLLECTIONS.orders),
  // products: dataPoint<IProduct>(COLLECTIONS.products),
  // operations: dataPoint<IRestaurant>(COLLECTIONS.operations),
  // users: dataPoint<IUser>(COLLECTIONS.users),
};
const app = initializeApp(environment.firebase);
const auth = getAuth(app);
const storage = getStorage();

const clientAlgolia = algoliasearch(environment.algolia.id, environment.algolia.adminKey);

const INDEX_ALGOLIA = {
  users: '',
  operations: '',
  products: '',
  entities: '',
};

if (useEmulators) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
  INDEX_ALGOLIA.users = 'test_users';
  INDEX_ALGOLIA.operations = 'test_operations';
  INDEX_ALGOLIA.products = 'test_products';
  INDEX_ALGOLIA.entities = 'test_entities';
} else {
  INDEX_ALGOLIA.users = 'prod_users';
  INDEX_ALGOLIA.operations = 'prod_operations';
  INDEX_ALGOLIA.products = 'prod_products';
  INDEX_ALGOLIA.entities = 'test_entities';
}

export {
  admin,
  functions,
  db,
  auth,
  clientAlgolia,
  INDEX_ALGOLIA,
  useEmulators,
  Timestamp,
  deleteObject,
  refStorage,
  storage,
};
