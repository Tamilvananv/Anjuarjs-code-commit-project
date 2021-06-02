import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsMaintenanceComponent } from './ics-maintenance.component';

describe('IcsMaintenanceComponent', () => {
  let component: IcsMaintenanceComponent;
  let fixture: ComponentFixture<IcsMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
