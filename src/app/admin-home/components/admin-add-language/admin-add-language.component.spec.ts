import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddLanguageComponent } from './admin-add-language.component';

describe('AdminAddLanguageComponent', () => {
  let component: AdminAddLanguageComponent;
  let fixture: ComponentFixture<AdminAddLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
