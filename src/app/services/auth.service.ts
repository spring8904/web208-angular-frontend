import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type LoginResponse = {
  accessToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  register(data: IUser) {
    return this.http.post('http://localhost:3000/register', data);
  }

  login(data: IUser) {
    return this.http.post<LoginResponse>('http://localhost:3000/login', data);
  }
}
