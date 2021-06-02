import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsPendingApprovalComponent } from './ims-pending-approval.component';

describe('ImsPendingApprovalComponent', () => {
  let component: ImsPendingApprovalComponent;
  let fixture: ComponentFixture<ImsPendingApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsPendingApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
