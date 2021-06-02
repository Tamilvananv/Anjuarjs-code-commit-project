import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaQualityAssuranceComponent } from './capa-quality-assurance.component';

describe('CapaQualityAssuranceComponent', () => {
  let component: CapaQualityAssuranceComponent;
  let fixture: ComponentFixture<CapaQualityAssuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapaQualityAssuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapaQualityAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
