import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwissHomeFinanceSliderComponent } from './swiss-home-finance-slider.component';

describe('SwissHomeFinanceSliderComponent', () => {
  let component: SwissHomeFinanceSliderComponent;
  let fixture: ComponentFixture<SwissHomeFinanceSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwissHomeFinanceSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwissHomeFinanceSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
