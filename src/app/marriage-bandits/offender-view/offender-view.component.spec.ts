import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenderViewComponent } from './offender-view.component';

describe('OffenderViewComponent', () => {
  let component: OffenderViewComponent;
  let fixture: ComponentFixture<OffenderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffenderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
