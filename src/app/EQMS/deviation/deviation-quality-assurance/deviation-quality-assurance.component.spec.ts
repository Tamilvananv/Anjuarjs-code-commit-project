import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationQualityAssuranceComponent } from './deviation-quality-assurance.component';

describe('DeviationQualityAssuranceComponent', () => {
  let component: DeviationQualityAssuranceComponent;
  let fixture: ComponentFixture<DeviationQualityAssuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviationQualityAssuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviationQualityAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
