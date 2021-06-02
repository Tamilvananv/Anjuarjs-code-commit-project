import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationFinalClosureComponent } from './deviation-final-closure.component';

describe('DeviationFinalClosureComponent', () => {
  let component: DeviationFinalClosureComponent;
  let fixture: ComponentFixture<DeviationFinalClosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviationFinalClosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviationFinalClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
