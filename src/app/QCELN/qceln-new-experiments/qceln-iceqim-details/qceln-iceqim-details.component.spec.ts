import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnIceqimDetailsComponent } from './qceln-iceqim-details.component';

describe('ElnIceqimDetailsComponent', () => {
  let component: QCElnIceqimDetailsComponent;
  let fixture: ComponentFixture<QCElnIceqimDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnIceqimDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnIceqimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
