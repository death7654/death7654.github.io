import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tiles',
  imports: [],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss',
})
export class TilesComponent {
  @Input() name: String = '';
  @Input() image: String = '';
}
