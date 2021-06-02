import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsInventoryMasterComponent } from './ims-inventory-master.component';

describe('ImsInventoryMasterComponent', () => {
  let component: ImsInventoryMasterComponent;
  let fixture: ComponentFixture<ImsInventoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsInventoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsInventoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
