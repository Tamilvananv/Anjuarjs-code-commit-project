import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsStockComponent } from './ims-stock.component';

describe('ImsStockComponent', () => {
  let component: ImsStockComponent;
  let fixture: ComponentFixture<ImsStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImsStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
