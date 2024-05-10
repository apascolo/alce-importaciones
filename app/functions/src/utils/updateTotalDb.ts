/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from 'firebase-admin';
import { db } from '../config/environment';
import { eCollentions } from '../enums/eCollections';
import { TotalDB } from '../types/TotalDb';

const updateTotalDb = async (data: TotalDB) => {
  const dataToUpdate: Record<string, any> = {};
  Object.keys(data).forEach((key) => {
    dataToUpdate[key] = admin.firestore.FieldValue.increment(data[key]);
  });

  return await db.collection(eCollentions.Mix).doc('statistics').update(dataToUpdate);
};

export { updateTotalDb };
