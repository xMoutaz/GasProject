import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewLanguageComponent } from './admin-add-new-language.component';

describe('AdminAddNewLanguageComponent', () => {
  let component: AdminAddNewLanguageComponent;
  let fixture: ComponentFixture<AdminAddNewLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddNewLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
