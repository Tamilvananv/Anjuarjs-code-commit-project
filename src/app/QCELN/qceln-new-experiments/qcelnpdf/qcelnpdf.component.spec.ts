import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnpdfComponent } from './qcelnpdf.component';

describe('ElnpdfComponent', () => {
  let component: QCElnpdfComponent;
  let fixture: ComponentFixture<QCElnpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
