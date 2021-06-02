import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeControlComponent } from './change-control.component';

describe('ChangeControlComponent', () => {
  let component: ChangeControlComponent;
  let fixture: ComponentFixture<ChangeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
