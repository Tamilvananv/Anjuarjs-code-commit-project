import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevExtensionComponent } from './dev-extension.component';

describe('DevExtensionComponent', () => {
  let component: DevExtensionComponent;
  let fixture: ComponentFixture<DevExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
