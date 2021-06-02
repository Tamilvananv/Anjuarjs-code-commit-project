import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsDashboardComponent } from './eqs-dashboard.component';

describe('EqsDashboardComponent', () => {
  let component: EqsDashboardComponent;
  let fixture: ComponentFixture<EqsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
