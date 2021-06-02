import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseNewRequestComponent } from './raise-new-request.component';

describe('RaiseNewRequestComponent', () => {
  let component: RaiseNewRequestComponent;
  let fixture: ComponentFixture<RaiseNewRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseNewRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
