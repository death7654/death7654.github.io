import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedMarketsComponent } from './supported-markets.component';

describe('SupportedMarketsComponent', () => {
  let component: SupportedMarketsComponent;
  let fixture: ComponentFixture<SupportedMarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportedMarketsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportedMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
