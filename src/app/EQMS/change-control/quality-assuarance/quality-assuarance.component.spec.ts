import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAssuaranceComponent } from './quality-assuarance.component';

describe('QualityAssuaranceComponent', () => {
  let component: QualityAssuaranceComponent;
  let fixture: ComponentFixture<QualityAssuaranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAssuaranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAssuaranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
