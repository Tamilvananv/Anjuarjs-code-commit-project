import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationPriliminaryComponent } from './deviation-priliminary.component';

describe('DeviationPriliminaryComponent', () => {
  let component: DeviationPriliminaryComponent;
  let fixture: ComponentFixture<DeviationPriliminaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviationPriliminaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviationPriliminaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
