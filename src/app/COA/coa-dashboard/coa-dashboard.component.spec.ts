import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaDashboardComponent } from './coa-dashboard.component';

describe('CoaDashboardComponent', () => {
  let component: CoaDashboardComponent;
  let fixture: ComponentFixture<CoaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
