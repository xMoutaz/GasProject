import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterationComponent } from './unregisteration.component';

describe('UnregisterationComponent', () => {
  let component: UnregisterationComponent;
  let fixture: ComponentFixture<UnregisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
