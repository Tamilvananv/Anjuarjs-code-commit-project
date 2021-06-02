import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnHomeMasterComponent } from './eln-home-master.component';

describe('ElnHomeMasterComponent', () => {
  let component: ElnHomeMasterComponent;
  let fixture: ComponentFixture<ElnHomeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnHomeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnHomeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
