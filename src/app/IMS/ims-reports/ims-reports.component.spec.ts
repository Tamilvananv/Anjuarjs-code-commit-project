import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsReportsComponent } from './ims-reports.component';

describe('ImsReportsComponent', () => {
  let component: ImsReportsComponent;
  let fixture: ComponentFixture<ImsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
