import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnUserSettingsComponent } from './qceln-user-settings.component';

describe('ElnUserSettingsComponent', () => {
  let component: QCElnUserSettingsComponent;
  let fixture: ComponentFixture<QCElnUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
