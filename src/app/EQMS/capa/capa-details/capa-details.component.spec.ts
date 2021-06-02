import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaDetailsComponent } from './capa-details.component';

describe('CapaDetailsComponent', () => {
  let component: CapaDetailsComponent;
  let fixture: ComponentFixture<CapaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
