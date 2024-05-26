import { Request, Response } from 'express';
import { eCollentions } from '../../enums';
import { db } from '../../config/environment';

const setStatisticsDefaultValues = async (_req: Request, res: Response) => {
  try {
    await db.collection(eCollentions.Mix).doc('statistics').set({
      totalProducts: 0,
      totalCategoriesProduct: 0,
      totalcategoriesExpense: 0,
      totalUsers: 0,
      totalCustomers: 0,
      totalSuppliers: 0,
      totalOperationsSaleUnPayed: 0,
      totalOperationsExpenseUnPayed: 0,
      totalBanks: 0,
      totalOperationSaleCancelled: 0,
      totalOperationSaleProcessing: 0,
    });

    return res.send('Statistics created successfully');
  } catch (error) {
    console.log(error);
    return res.send('Has ocurred an error');
  }
};

export { setStatisticsDefaultValues };
