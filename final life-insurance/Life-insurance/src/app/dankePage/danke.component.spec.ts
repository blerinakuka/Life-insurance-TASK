import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DankeComponent } from './danke.component';

describe('DankeComponent', () => {
  let component: DankeComponent;
  let fixture: ComponentFixture<DankeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DankeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DankeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
