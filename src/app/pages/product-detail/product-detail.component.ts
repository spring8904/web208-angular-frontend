import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product: IProduct | null = null;
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  title = inject(Title);
  router = inject(Router);
  quantity = 1;

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.productService.getProductDetail(params['id']).subscribe({
        next: ({ data }) => {
          this.product = data;
          this.title.setTitle(data.title + ' | Spring Store');
        },
        error: (e) => {
          console.log(e);
          this.router.navigate(['/not-found']);
        },
      });
    });
  }
}
