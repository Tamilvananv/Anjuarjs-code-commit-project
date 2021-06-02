import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EqsUsersettingsComponent } from "./eqs-usersettings.component";
import { FormsModule } from "@angular/forms";

describe("EqsUsersettingsComponent", () => {
  let component: EqsUsersettingsComponent;
  let fixture: ComponentFixture<EqsUsersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EqsUsersettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqsUsersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
