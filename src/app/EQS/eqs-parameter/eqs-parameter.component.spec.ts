import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsParameterComponent } from './eqs-parameter.component';

describe('EqsParameterComponent', () => {
  let component: EqsParameterComponent;
  let fixture: ComponentFixture<EqsParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
