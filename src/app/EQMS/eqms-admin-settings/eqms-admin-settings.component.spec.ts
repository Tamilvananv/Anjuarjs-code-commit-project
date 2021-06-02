import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqmsAdminSettingsComponent } from './eqms-admin-settings.component';

describe('EqmsAdminSettingsComponent', () => {
  let component: EqmsAdminSettingsComponent;
  let fixture: ComponentFixture<EqmsAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqmsAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqmsAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
