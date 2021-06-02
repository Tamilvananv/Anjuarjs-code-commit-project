import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsCalibrationRecordMasterComponent } from './eqs-calibration-record-master.component';

describe('EqsCalibrationRecordMasterComponent', () => {
  let component: EqsCalibrationRecordMasterComponent;
  let fixture: ComponentFixture<EqsCalibrationRecordMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsCalibrationRecordMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsCalibrationRecordMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
