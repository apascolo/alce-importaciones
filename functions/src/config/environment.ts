import * as admin from 'firebase-admin';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

const db = getFirestore();

const isEmulators = process.env.EMULATORS;

const algolia = {
  id: process.env.ALGOLIA_ID || '',
  adminKey: process.env.ALGOLIA_ADMIN_KEY || '',
};

const INDEX_ALGOLIA = {
  users: isEmulators ? 'test_users' : 'prod_users',
  operations: isEmulators ? 'test_operations' : 'prod_operations',
  products: isEmulators ? 'test_products' : 'prod_products',
  entities: isEmulators ? 'test_entities' : 'prod_entities',
};

const clientAlgolia = algoliasearch(algolia.id, algolia.adminKey);

export { db, functions, clientAlgolia, INDEX_ALGOLIA, admin, FieldValue };
