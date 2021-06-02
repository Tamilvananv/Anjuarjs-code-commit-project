import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnExperimentsProcessSummaryComponent } from './eln-experiments-process-summary.component';

describe('ElnExperimentsProcedureComponent', () => {
  let component: ElnExperimentsProcessSummaryComponent;
  let fixture: ComponentFixture<ElnExperimentsProcessSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnExperimentsProcessSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnExperimentsProcessSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
