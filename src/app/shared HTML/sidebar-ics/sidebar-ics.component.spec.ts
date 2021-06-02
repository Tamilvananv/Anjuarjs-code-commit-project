import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarIcsComponent } from './sidebar-ics.component';

describe('SidebarEqsComponent', () => {
  let component: SidebarIcsComponent;
  let fixture: ComponentFixture<SidebarIcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarIcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarIcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
