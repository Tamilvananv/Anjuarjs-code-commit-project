import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqsCustomheaderfieldsComponent } from './eqs-customheaderfields.component';

describe('EqsCustomheaderfieldsComponent', () => {
  let component: EqsCustomheaderfieldsComponent;
  let fixture: ComponentFixture<EqsCustomheaderfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqsCustomheaderfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsCustomheaderfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
