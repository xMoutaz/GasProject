import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeClaimComponent } from './claims.component';

describe('ClaimsComponent', () => {
  let component: MakeClaimComponent;
  let fixture: ComponentFixture<MakeClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
