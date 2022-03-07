import { PurchaseDetail } from './purchaseDetail';

export interface PurchaseOrder {

  id: number;

  username?: string;

  purchaseDetail: PurchaseDetail[];

}