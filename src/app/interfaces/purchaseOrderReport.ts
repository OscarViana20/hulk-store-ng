export interface PurchaseOrderReport {
  id: number;
  personName: string;
  personLastName: string;
  totalPurchase: number;
  paymentType: string;
  createdDate: Date;
}