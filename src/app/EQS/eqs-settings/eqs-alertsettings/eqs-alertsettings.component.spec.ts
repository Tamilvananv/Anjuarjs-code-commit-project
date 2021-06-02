import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsAlertsettingsComponent } from './eqs-alertsettings.component';

describe('EqsAlertsettingsComponent', () => {
  let component: EqsAlertsettingsComponent;
  let fixture: ComponentFixture<EqsAlertsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsAlertsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsAlertsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
