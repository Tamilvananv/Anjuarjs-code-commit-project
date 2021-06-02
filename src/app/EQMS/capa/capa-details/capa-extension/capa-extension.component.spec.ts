import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaExtensionComponent } from './capa-extension.component';

describe('CapaExtensionComponent', () => {
  let component: CapaExtensionComponent;
  let fixture: ComponentFixture<CapaExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapaExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapaExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
