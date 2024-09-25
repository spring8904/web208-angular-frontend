import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDeleteComponent } from '../../../components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  productService = inject(ProductService);
  toastr = inject(ToastrService);

  products: IProduct[] = [];

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

  onDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p._id !== id);
        this.toastr.success('Product deleted');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Error: ' + e.message);
      },
    });
  }
}
