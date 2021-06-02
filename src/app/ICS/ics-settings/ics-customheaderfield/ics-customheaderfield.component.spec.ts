import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsCustomheaderfieldComponent } from './ics-customheaderfield.component';

describe('IcsCustomheaderfieldComponent', () => {
  let component: IcsCustomheaderfieldComponent;
  let fixture: ComponentFixture<IcsCustomheaderfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsCustomheaderfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsCustomheaderfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
