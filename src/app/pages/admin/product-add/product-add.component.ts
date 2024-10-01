import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  bidTimeValidator,
  startAtValidator,
} from '../../../validators/product';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './product-add.component.html',
})
export class ProductAddComponent {
  productService = inject(ProductService);
  toastr = inject(ToastrService);
  route = inject(Router);

  form = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      startAt: new FormControl('', startAtValidator()),
      bidTime: new FormControl(''),
      isShow: new FormControl(true),
    },
    {
      validators: bidTimeValidator(),
    }
  );

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productService.create(this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('Create product successfully');
        this.route.navigate(['/dashboard/products']);
      },
      error: (err) => {
        if (Array.isArray(err.error.message)) {
          err.error.message.forEach((msg: string | undefined) => {
            this.toastr.error(msg);
          });
        } else {
          this.toastr.error(err.error.message);
        }
      },
    });
  }
}
