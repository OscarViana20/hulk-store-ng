import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '/hulk-store-api/login';
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl, 
      {
        username: username, 
        password: password
      }, {observe: 'response'}
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
