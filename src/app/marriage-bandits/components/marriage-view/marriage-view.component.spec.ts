import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageViewComponent } from './marriage-view.component';

describe('MarriageViewComponent', () => {
  let component: MarriageViewComponent;
  let fixture: ComponentFixture<MarriageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
