import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = '/hulk-store-api/';
  }

  findCategories(): Observable<Category[]>  {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token') ?? []);
    const url = `${this.baseUrl}api/category/findAllCategories`;
    return this.http.get<Category[]>(url, {headers});
  }
}
