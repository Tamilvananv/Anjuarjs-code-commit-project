import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsBarcodingComponent } from './sms-barcoding.component';

describe('SmsBarcodingComponent', () => {
  let component: SmsBarcodingComponent;
  let fixture: ComponentFixture<SmsBarcodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsBarcodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsBarcodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
