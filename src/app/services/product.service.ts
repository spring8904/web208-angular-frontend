import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  getAll() {
    return this.http.get<{ data: IProduct[] }>(`${this.apiUrl}/products`);
  }

  getProductDetail(id: string) {
    return this.http.get<{ data: IProduct }>(`${this.apiUrl}/products/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
