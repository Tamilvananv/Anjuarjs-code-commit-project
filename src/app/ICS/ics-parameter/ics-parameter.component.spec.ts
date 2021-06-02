import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsParameterComponent } from './ics-parameter.component';

describe('IcsParameterComponent', () => {
  let component: IcsParameterComponent;
  let fixture: ComponentFixture<IcsParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
