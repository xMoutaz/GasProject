import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPropertiesForRentComponent } from './search-properties-for-rent.component';

describe('SearchPropertiesForRentComponent', () => {
  let component: SearchPropertiesForRentComponent;
  let fixture: ComponentFixture<SearchPropertiesForRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPropertiesForRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPropertiesForRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
