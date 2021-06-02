import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsQualificationComponent } from './ics-qualification.component';

describe('IcsQualificationComponent', () => {
  let component: IcsQualificationComponent;
  let fixture: ComponentFixture<IcsQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
