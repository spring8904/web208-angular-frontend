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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent {
  productService = inject(ProductService);
  toastr = inject(ToastrService);
  activatedRoute = inject(ActivatedRoute);
  title = inject(Title);
  router = inject(Router);

  form = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      startAt: new FormControl('', startAtValidator()),
      bidTime: new FormControl(''),
      isShow: new FormControl(''),
    },
    {
      validators: bidTimeValidator(),
    }
  );

  id = this.activatedRoute.snapshot.params['id'];

  ngOnInit() {
    this.productService.getProductDetail(this.id).subscribe({
      next: ({ data }) => {
        this.title.setTitle(data.title + ' | Spring Store');
        this.setFormValues(data);
      },
      error: (e) => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  setFormValues(data: any) {
    this.form.patchValue({
      ...data,
      startAt: this.formatDateForInput(data.startAt),
    });
  }

  formatDateForInput(date: any): string {
    date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng từ 0-11
    const dd = ('0' + date.getDate()).slice(-2);
    const hh = ('0' + date.getHours()).slice(-2);
    const min = ('0' + date.getMinutes()).slice(-2);

    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productService.update(this.id, this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('Update product successfully');
        this.router.navigate(['/dashboard/products']);
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
