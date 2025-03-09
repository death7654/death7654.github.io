import { Component } from '@angular/core';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [BodyComponent, NavbarComponent, RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {}
