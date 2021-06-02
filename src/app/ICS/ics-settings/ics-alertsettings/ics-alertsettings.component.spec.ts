import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsAlertsettingsComponent } from './ics-alertsettings.component';

describe('IcsAlertsettingsComponent', () => {
  let component: IcsAlertsettingsComponent;
  let fixture: ComponentFixture<IcsAlertsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsAlertsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsAlertsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
