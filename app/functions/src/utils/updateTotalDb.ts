/* eslint-disable @typescript-eslint/no-explicit-any */
import { eTotalsDb } from 'src/enums';
import { FieldValue, db } from '../config/environment';
import { eCollentions } from '../enums/eCollections';
import { TotalDB } from '../types/TotalDb';

const updateTotalDb = async (data: TotalDB) => {
  try {
    const dataToUpdate: Record<string, any> = {};
    Object.keys(data).forEach((key: string) => {
      dataToUpdate[key] = FieldValue.increment(data[key as eTotalsDb]);
    });

    return await db.collection(eCollentions.Mix).doc('statistics').update(dataToUpdate);
  } catch (error) {
    return console.log(error);
  }
};

export { updateTotalDb };
