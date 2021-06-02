import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsHomeMasterComponent } from './ims-home-master.component';

describe('ImsHomeMasterComponent', () => {
  let component: ImsHomeMasterComponent;
  let fixture: ComponentFixture<ImsHomeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsHomeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsHomeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
