import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
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
        console.log(e);
        this.toastr.error('Error: ' + e.message);
      },
    });
  }
}
