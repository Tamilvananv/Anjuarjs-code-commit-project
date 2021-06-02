import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsSettingsComponent } from './ims-settings.component';

describe('ImsSettingsComponent', () => {
  let component: ImsSettingsComponent;
  let fixture: ComponentFixture<ImsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
