import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsMaterialNearingExpiryComponent } from './ims-material-nearing-expiry.component';

describe('ImsMaterialNearingExpiryComponent', () => {
  let component: ImsMaterialNearingExpiryComponent;
  let fixture: ComponentFixture<ImsMaterialNearingExpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsMaterialNearingExpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsMaterialNearingExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
