import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { PurchaseOrder } from 'src/app/interfaces/purchaseOrder';
import { PurchaseOrderReport } from 'src/app/interfaces/purchaseOrderReport';
import { PurchaseReportDetail } from 'src/app/interfaces/purchaseReportDetail';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = '/hulk-store-api/';
  } 

  createPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<void> {
    const url = `${this.baseUrl}api/purchaseOrder/createPurchaseOrder`;
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    purchaseOrder.username = localStorage.getItem('userName') ?? undefined;
    return this.http.post<void>(url, purchaseOrder, { headers });
  }

  findAllPaymentType(): Observable<PaymentType[]> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    const url = `${this.baseUrl}api/paymentType/findAllPaymentType`;
    return this.http.get<PaymentType[]>(url, {headers});
  }

  findAllPurchaseOrder(): Observable<PurchaseOrderReport[]> {
    const userName = localStorage.getItem('userName');
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    const url = `${this.baseUrl}api/purchaseOrder/findAllPurchaseOrder/${userName}`;
    return this.http.get<PurchaseOrderReport[]>(url, {headers});
  }
  
  findDetailPurchaseOrder(idPurchase: number): Observable<PurchaseReportDetail[]> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    const url = `${this.baseUrl}api/purchaseOrder/findDetailPurchaseOrder/${idPurchase}`;
    return this.http.get<PurchaseReportDetail[]>(url, {headers});
  }
}
