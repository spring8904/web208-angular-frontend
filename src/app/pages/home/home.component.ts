import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: IProduct[] = [];
  productService = inject(ProductService);
  toastr = inject(ToastrService);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: ({ data }) => {
        this.products = data;
      },
      error: (e) => {
        this.toastr.error('Error: ' + e.message);
      },
    });
  }
}
