import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsCalibrationReportComponent } from './eqs-calibration-report.component';

describe('EqsCalibrationReportComponent', () => {
  let component: EqsCalibrationReportComponent;
  let fixture: ComponentFixture<EqsCalibrationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsCalibrationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsCalibrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
