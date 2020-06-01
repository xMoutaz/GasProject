import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPropertiesForSaleComponent } from './search-properties-for-sale.component';

describe('SearchPropertiesForSaleComponent', () => {
  let component: SearchPropertiesForSaleComponent;
  let fixture: ComponentFixture<SearchPropertiesForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPropertiesForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPropertiesForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
