import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseTransLoaderComponent } from './firebase-trans-loader.component';

describe('FirebaseTransLoaderComponent', () => {
  let component: FirebaseTransLoaderComponent;
  let fixture: ComponentFixture<FirebaseTransLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseTransLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseTransLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
