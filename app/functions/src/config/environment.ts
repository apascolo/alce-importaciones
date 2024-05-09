import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';
import * as dotenv from 'dotenv';

dotenv.config();

const db = getFirestore();

const algolia = {
  id: process.env.ALGOLIA_ID || '',
  adminKey: process.env.ALGOLIA_ADMIN_KEY || '',
};

const INDEX_ALGOLIA = {
  users: '',
  operations: '',
  products: '',
  entities: '',
};

const clientAlgolia = algoliasearch(algolia.id, algolia.adminKey);

export { db, functions, clientAlgolia, INDEX_ALGOLIA };
