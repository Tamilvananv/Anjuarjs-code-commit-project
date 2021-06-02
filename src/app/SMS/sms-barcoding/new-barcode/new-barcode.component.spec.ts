import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBarcodeComponent } from './new-barcode.component';

describe('NewBarcodeComponent', () => {
  let component: NewBarcodeComponent;
  let fixture: ComponentFixture<NewBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
