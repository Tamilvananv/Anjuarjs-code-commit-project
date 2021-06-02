import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsCalibrationmasterComponent } from './ics-calibrationmaster.component';

describe('IcsCalibrationmasterComponent', () => {
  let component: IcsCalibrationmasterComponent;
  let fixture: ComponentFixture<IcsCalibrationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsCalibrationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsCalibrationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
