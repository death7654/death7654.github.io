import { Component, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { start } from 'repl';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  activeLink = 'home';

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const navbar = document.getElementById('navbar');

    // Get background color of body or navbar

    // Convert RGB to brightness value
    const scrollPosition = window.scrollY;
    console.log(scrollPosition);
    if (scrollPosition > 200) {
      navbar?.classList.add('navbar_black');
      navbar?.classList.remove('navbar_transparent');
    } else {
      navbar?.classList.remove('navbar_black');
      navbar?.classList.add('navbar_transparent');
    }
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  scrollToPricing() {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollToDiscover() {
    const discoverSection = document.getElementById('discover');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
