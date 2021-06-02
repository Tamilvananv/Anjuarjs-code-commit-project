import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsParameterKeyboardEntryComponent } from './eqs-parameter-keyboard-entry.component';

describe('EqsParameterKeyboardEntryComponent', () => {
  let component: EqsParameterKeyboardEntryComponent;
  let fixture: ComponentFixture<EqsParameterKeyboardEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsParameterKeyboardEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsParameterKeyboardEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
