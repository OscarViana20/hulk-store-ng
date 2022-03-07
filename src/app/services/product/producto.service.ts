import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/hulk-store-api/';
  }

  findProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    const url = `${this.baseUrl}api/product/findAvailableProducts`;
    return this.http.get<Product[]>(url, { headers });
  }

  findStockProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    const url = `${this.baseUrl}api/product/findStockProducts`;
    return this.http.get<Product[]>(url, {headers});
  }

  createProduct(product: Product): Observable<void> {
    const url = `${this.baseUrl}api/product/createProduct`;
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    return this.http.post<void>(url, product, { headers });
  }

  updateProduct(product: Product): Observable<void> {
    const url = `${this.baseUrl}api/product/updateProduct`;
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    return this.http.post<void>(url, product, { headers });
  }

  inactivateProduct(product: Product): Observable<void> {
    const url = `${this.baseUrl}api/product/inactivateProduct`;
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    return this.http.post<void>(url, product, { headers });
  }

}
