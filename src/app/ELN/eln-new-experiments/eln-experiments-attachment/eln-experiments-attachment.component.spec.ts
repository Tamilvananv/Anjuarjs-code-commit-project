import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnExperimentsAttachmentComponent } from './eln-experiments-attachment.component';

describe('ElnExperimentsAttachmentComponent', () => {
  let component: ElnExperimentsAttachmentComponent;
  let fixture: ComponentFixture<ElnExperimentsAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnExperimentsAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnExperimentsAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
