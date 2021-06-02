import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnHomeMasterComponent } from './qceln-home-master.component';

describe('ElnHomeMasterComponent', () => {
  let component: QCElnHomeMasterComponent;
  let fixture: ComponentFixture<QCElnHomeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnHomeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnHomeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
