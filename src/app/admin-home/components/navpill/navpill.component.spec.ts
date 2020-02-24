import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavpillComponent } from './navpill.component';

describe('NavpillComponent', () => {
  let component: NavpillComponent;
  let fixture: ComponentFixture<NavpillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavpillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavpillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
