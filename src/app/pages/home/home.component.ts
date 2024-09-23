import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: IProduct[] = [];
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: ({ data }) => {
        this.products = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        alert('Error: ' + e.message);
      },
    });
  }
}
