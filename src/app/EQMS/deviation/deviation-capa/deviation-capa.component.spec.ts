import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationCapaComponent } from './deviation-capa.component';

describe('DeviationCapaComponent', () => {
  let component: DeviationCapaComponent;
  let fixture: ComponentFixture<DeviationCapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviationCapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviationCapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
