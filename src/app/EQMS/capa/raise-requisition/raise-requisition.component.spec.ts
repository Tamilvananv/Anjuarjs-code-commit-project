import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequisitionComponent } from './raise-requisition.component';

describe('RaiseRequisitionComponent', () => {
  let component: RaiseRequisitionComponent;
  let fixture: ComponentFixture<RaiseRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
