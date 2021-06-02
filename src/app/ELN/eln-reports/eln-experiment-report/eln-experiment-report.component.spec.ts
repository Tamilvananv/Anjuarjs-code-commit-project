import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElnExperimentsReportComponent } from './eln-experiment-report.component';

describe('ElnExperimentsReportComponent', () => {
  let component: ElnExperimentsReportComponent;
  let fixture: ComponentFixture<ElnExperimentsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnExperimentsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnExperimentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
