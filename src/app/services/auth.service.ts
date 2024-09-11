import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  //----user login function ----
  login(payload: Login): Observable<Token> {
    return this.httpClient.post<Token>('https://reqres.in/api/login', payload);
  }
}
