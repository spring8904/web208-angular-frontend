import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
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
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard/products', pathMatch: 'full' },
      {
        path: 'products',
        component: ProductsComponent,
      },
    ],
  },
];
