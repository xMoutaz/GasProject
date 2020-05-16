import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMarriageComponent } from './register-marriage.component';

describe('RegisterMarriageComponent', () => {
  let component: RegisterMarriageComponent;
  let fixture: ComponentFixture<RegisterMarriageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMarriageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
