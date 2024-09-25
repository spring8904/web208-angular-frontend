import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  authServices = inject(AuthService);
  router = inject(Router);

  isLogin: boolean = !!localStorage.getItem('token');
  isSearchActive: boolean = false;
  isSticky: boolean = false;

  email: string = localStorage.getItem('email') || '';
  isAdmin: boolean = false;

  constructor() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    });
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLogin = false;
    this.router.navigate(['/login-register']);
  }

  ngOnInit() {
    if (this.isLogin) {
      this.authServices.checkIsAdmin(this.email).subscribe((res) => {
        this.isAdmin = res.isAdmin;
      });
    }
  }

  ngDoCheck() {
    this.isLogin = !!localStorage.getItem('token');
  }
}
