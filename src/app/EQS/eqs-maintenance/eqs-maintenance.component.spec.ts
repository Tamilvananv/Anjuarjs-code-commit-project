import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsMaintenanceComponent } from './eqs-maintenance.component';

describe('EqsMaintenanceComponent', () => {
  let component: EqsMaintenanceComponent;
  let fixture: ComponentFixture<EqsMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
