import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product: IProduct | null = null;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  title = inject(Title);

  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.productService.getProductDetail(params['id']).subscribe({
  //       next: (data) => {
  //         this.product = data;
  //         this.title.setTitle(data.title);
  //       },
  //       error: (e) => {
  //         console.log(e);
  //         alert('Error: ' + e.message);
  //       },
  //     });
  //   });
  // }
}
