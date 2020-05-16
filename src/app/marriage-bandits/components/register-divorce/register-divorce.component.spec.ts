import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDivorceComponent } from './register-divorce.component';

describe('RegisterDivorceComponent', () => {
  let component: RegisterDivorceComponent;
  let fixture: ComponentFixture<RegisterDivorceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDivorceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDivorceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
