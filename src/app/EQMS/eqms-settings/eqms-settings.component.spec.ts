import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqmsSettingsComponent } from './eqms-settings.component';

describe('EqmsSettingsComponent', () => {
  let component: EqmsSettingsComponent;
  let fixture: ComponentFixture<EqmsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqmsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
