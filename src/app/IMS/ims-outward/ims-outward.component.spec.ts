import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsOutwardComponent } from './ims-outward.component';

describe('ImsOutwardComponent', () => {
  let component: ImsOutwardComponent;
  let fixture: ComponentFixture<ImsOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
