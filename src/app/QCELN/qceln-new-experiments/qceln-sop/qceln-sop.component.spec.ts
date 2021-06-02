import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnSopComponent } from './eln-sop.component';

describe('ElnSopPrecautionsComponent', () => {
  let component: ElnSopComponent;
  let fixture: ComponentFixture<ElnSopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnSopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
