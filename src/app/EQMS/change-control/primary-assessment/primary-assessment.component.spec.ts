import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAssessmentComponent } from './primary-assessment.component';

describe('PrimaryAssessmentComponent', () => {
  let component: PrimaryAssessmentComponent;
  let fixture: ComponentFixture<PrimaryAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
