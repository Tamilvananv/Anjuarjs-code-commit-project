import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsInstrumentTypeComponent } from './ics-instrument-type.component';

describe('IcsInstrumentTypeComponent', () => {
  let component: IcsInstrumentTypeComponent;
  let fixture: ComponentFixture<IcsInstrumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsInstrumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsInstrumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
