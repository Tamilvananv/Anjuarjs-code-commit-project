import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentHistoryComponent } from './instrument-history.component';

describe('InstrumentHistoryComponent', () => {
  let component: InstrumentHistoryComponent;
  let fixture: ComponentFixture<InstrumentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
