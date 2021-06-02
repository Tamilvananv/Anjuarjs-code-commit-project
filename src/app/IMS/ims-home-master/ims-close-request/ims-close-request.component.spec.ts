import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsCloseRequestComponent } from './ims-close-request.component';

describe('ImsCloseRequestComponent', () => {
  let component: ImsCloseRequestComponent;
  let fixture: ComponentFixture<ImsCloseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsCloseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsCloseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
