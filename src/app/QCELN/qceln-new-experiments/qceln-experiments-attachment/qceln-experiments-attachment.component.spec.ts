import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnExperimentsAttachmentComponent } from './qceln-experiments-attachment.component';

describe('ElnExperimentsAttachmentComponent', () => {
  let component: QCElnExperimentsAttachmentComponent;
  let fixture: ComponentFixture<QCElnExperimentsAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnExperimentsAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnExperimentsAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
