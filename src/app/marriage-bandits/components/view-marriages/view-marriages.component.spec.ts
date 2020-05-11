import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarriagesComponent } from './view-marriages.component';

describe('ViewMarriagesComponent', () => {
  let component: ViewMarriagesComponent;
  let fixture: ComponentFixture<ViewMarriagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarriagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMarriagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
