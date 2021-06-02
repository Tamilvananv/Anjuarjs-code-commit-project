import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnSignSubmitsComponent } from './eln-sign-submits.component';

describe('ElnSignSubmitsComponent', () => {
  let component: ElnSignSubmitsComponent;
  let fixture: ComponentFixture<ElnSignSubmitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnSignSubmitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnSignSubmitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
