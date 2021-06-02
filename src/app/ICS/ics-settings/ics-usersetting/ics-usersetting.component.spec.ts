import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsUsersettingComponent } from './ics-usersetting.component';

describe('IcsUsersettingComponent', () => {
  let component: IcsUsersettingComponent;
  let fixture: ComponentFixture<IcsUsersettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsUsersettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsUsersettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
