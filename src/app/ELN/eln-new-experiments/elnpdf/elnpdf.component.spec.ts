import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElnpdfComponent } from './elnpdf.component';

describe('ElnpdfComponent', () => {
  let component: ElnpdfComponent;
  let fixture: ComponentFixture<ElnpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElnpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElnpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
