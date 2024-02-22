import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyInsuranceComponent } from './family-insurance.component';

describe('FamilyInsuranceComponent', () => {
  let component: FamilyInsuranceComponent;
  let fixture: ComponentFixture<FamilyInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyInsuranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
