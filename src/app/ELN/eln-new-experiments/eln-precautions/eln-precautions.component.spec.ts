import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnPrecautionsComponent } from './eln-precautions.component';

describe('ElnSopPrecautionsComponent', () => {
  let component: ElnPrecautionsComponent;
  let fixture: ComponentFixture<ElnPrecautionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnPrecautionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnPrecautionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
