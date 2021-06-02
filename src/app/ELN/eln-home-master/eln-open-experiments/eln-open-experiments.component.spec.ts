import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnOpenExperimentsComponent } from './eln-open-experiments.component';

describe('ElnOpenExperimentsComponent', () => {
  let component: ElnOpenExperimentsComponent;
  let fixture: ComponentFixture<ElnOpenExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnOpenExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnOpenExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
