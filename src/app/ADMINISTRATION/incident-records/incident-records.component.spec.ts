import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentRecordsComponent } from './incident-records.component';

describe('IncidentRecordsComponent', () => {
  let component: IncidentRecordsComponent;
  let fixture: ComponentFixture<IncidentRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
