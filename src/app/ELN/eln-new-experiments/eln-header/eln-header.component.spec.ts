import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnHeaderComponent } from './eln-header.component';

describe('ElnHeaderComponent', () => {
  let component: ElnHeaderComponent;
  let fixture: ComponentFixture<ElnHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
