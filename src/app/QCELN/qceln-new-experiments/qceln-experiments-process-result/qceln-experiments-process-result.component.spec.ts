import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnProcessSummaryComponent } from './qceln-experiments-process-result.component';

describe('ElnExperimentsProcedureComponent', () => {
  let component: QCElnProcessSummaryComponent;
  let fixture: ComponentFixture<QCElnProcessSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnProcessSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnProcessSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
