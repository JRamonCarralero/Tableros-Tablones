import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, SharedModule ],
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
