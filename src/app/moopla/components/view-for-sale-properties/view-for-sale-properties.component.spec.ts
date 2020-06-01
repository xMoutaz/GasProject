import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewForSalePropertiesComponent } from './view-for-sale-properties.component';

describe('ViewForSalePropertiesComponent', () => {
  let component: ViewForSalePropertiesComponent;
  let fixture: ComponentFixture<ViewForSalePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewForSalePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewForSalePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
