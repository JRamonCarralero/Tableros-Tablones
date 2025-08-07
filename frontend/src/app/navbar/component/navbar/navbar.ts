import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  /**
   * Toggle the visibility of the mobile menu.
   *
   * @remarks
   * This is a temporary solution until we have a proper responsive design.
   * This function is called when the mobile menu button is clicked.
   */
  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }
}
