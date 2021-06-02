import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnPrecautionsComponent } from './qceln-precautions.component';

describe('ElnSopPrecautionsComponent', () => {
  let component: QCElnPrecautionsComponent;
  let fixture: ComponentFixture<QCElnPrecautionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnPrecautionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnPrecautionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
