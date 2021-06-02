import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditSettingsComponent } from './audit-settings.component';

describe('AuditSettingsComponent', () => {
  let component: AuditSettingsComponent;
  let fixture: ComponentFixture<AuditSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
