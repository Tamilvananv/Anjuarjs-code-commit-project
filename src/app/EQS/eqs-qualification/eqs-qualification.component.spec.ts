import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsQualificationComponent } from './eqs-qualification.component';

describe('EqsQualificationComponent', () => {
  let component: EqsQualificationComponent;
  let fixture: ComponentFixture<EqsQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
