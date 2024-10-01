import { Routes } from '@angular/router';
import { guardGuard } from './admin/guard.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/product-edit/product-edit.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        title: 'Spring Store',
        component: HomeComponent,
      },
      {
        path: 'shop',
        title: 'Shop | Spring Store',
        component: ShopComponent,
      },
      { path: 'products/:id', component: ProductDetailComponent },
      {
        path: 'login-register',
        title: 'Login & Register | Spring Store',
        component: LoginRegisterComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [guardGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        title: 'Product Management | Spring Store',
        component: ProductsComponent,
      },
      {
        path: 'products/add',
        title: 'Add Product | Spring Store',
        component: ProductAddComponent,
      },
      {
        path: 'products/edit/:id',
        title: 'Edit Product | Spring Store',
        component: ProductEditComponent,
      },
    ],
  },
  {
    path: '**',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        title: 'Page Not Found | Spring Store',
        component: PageNotFoundComponent,
      },
    ],
  },
];
