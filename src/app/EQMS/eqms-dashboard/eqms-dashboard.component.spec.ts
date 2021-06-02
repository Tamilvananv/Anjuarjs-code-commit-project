import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqmsDashboardComponent } from './eqms-dashboard.component';

describe('EqmsDashboardComponent', () => {
  let component: EqmsDashboardComponent;
  let fixture: ComponentFixture<EqmsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqmsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
