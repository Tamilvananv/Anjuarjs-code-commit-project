import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnIceqimDetailsComponent } from './eln-iceqim-details.component';

describe('ElnIceqimDetailsComponent', () => {
  let component: ElnIceqimDetailsComponent;
  let fixture: ComponentFixture<ElnIceqimDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnIceqimDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnIceqimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
