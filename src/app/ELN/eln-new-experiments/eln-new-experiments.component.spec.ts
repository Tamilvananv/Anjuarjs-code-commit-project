import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnNewExperimentsComponent } from './eln-new-experiments.component';

describe('ElnNewExperimentsComponent', () => {
  let component: ElnNewExperimentsComponent;
  let fixture: ComponentFixture<ElnNewExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnNewExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnNewExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
