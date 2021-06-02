import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnHeaderComponent } from './qceln-header.component';

describe('ElnHeaderComponent', () => {
  let component: QCElnHeaderComponent;
  let fixture: ComponentFixture<QCElnHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
