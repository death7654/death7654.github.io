import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { StartComponent } from './start/start.component';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [StartComponent, BodyComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'website';
}
