import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwissHomeComponent } from './swiss-home.component';

describe('SwissHomeComponent', () => {
  let component: SwissHomeComponent;
  let fixture: ComponentFixture<SwissHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwissHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwissHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
