import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnUserSettingsComponent } from './eln-user-settings.component';

describe('ElnUserSettingsComponent', () => {
  let component: ElnUserSettingsComponent;
  let fixture: ComponentFixture<ElnUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
