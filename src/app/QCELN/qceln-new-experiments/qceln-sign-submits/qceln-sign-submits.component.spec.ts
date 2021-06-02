import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCElnSignSubmitsComponent } from './qceln-sign-submits.component';

describe('ElnSignSubmitsComponent', () => {
  let component: QCElnSignSubmitsComponent;
  let fixture: ComponentFixture<QCElnSignSubmitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCElnSignSubmitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCElnSignSubmitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
