import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOffendersComponent } from './view-offenders.component';

describe('ViewOffendersComponent', () => {
  let component: ViewOffendersComponent;
  let fixture: ComponentFixture<ViewOffendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOffendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOffendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
