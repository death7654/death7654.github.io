import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() class = '';
  @Input() component = 0;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const navbar = document.getElementById('navbar');
    console.log(this.component);

    // Get background color of body or navbar

    // Convert RGB to brightness value
    if (this.component == 0) {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        navbar?.classList.add('navbar_black');
        navbar?.classList.remove('navbar_transparent');
      } else {
        navbar?.classList.remove('navbar_black');
        navbar?.classList.add('navbar_transparent');
      }
    }
  }
}
