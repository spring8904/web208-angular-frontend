import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

type LoginResponse = {
  token: string;
  isAdmin: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data);
  }
}
