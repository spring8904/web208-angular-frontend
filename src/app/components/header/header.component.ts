import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
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
}
