import { PurchaseDetail } from './purchaseDetail';

export interface PurchaseOrder {

  paymentTypeId: number;

  username?: string;

  purchaseDetail: PurchaseDetail[];

}