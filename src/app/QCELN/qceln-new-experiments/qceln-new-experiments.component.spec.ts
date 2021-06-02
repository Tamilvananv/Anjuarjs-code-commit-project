import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnNewExperimentsComponent } from './qceln-new-experiments.component';

describe('ElnNewExperimentsComponent', () => {
  let component: QCElnNewExperimentsComponent;
  let fixture: ComponentFixture<QCElnNewExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnNewExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnNewExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
