import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsReorderComponent } from './ims-reorder.component';

describe('ImsReorderComponent', () => {
  let component: ImsReorderComponent;
  let fixture: ComponentFixture<ImsReorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsReorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
