import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaAssessmentComponent } from './qa-assessment.component';

describe('QaAssessmentComponent', () => {
  let component: QaAssessmentComponent;
  let fixture: ComponentFixture<QaAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
