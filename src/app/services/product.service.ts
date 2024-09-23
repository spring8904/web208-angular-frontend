import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  api = 'http://localhost:3000/products';

  getAll() {
    return this.http.get<{ data: IProduct[] }>(this.api);
  }

  getProductDetail(id: string) {
    return this.http.get<{ data: IProduct }>(`${this.api}/${id}`);
  }
}
