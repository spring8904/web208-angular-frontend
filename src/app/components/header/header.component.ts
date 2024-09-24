import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authServices = inject(AuthService);
  router = inject(Router);

  isLogin: boolean = !!localStorage.getItem('token');
  isSearchActive: boolean = false;
  isSticky: boolean = false;

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
    this.isLogin = false;
    this.router.navigate(['/login-register']);
  }
}
