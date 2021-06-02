import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsInwardComponent } from './ims-inward.component';

describe('ImsInwardComponent', () => {
  let component: ImsInwardComponent;
  let fixture: ComponentFixture<ImsInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
