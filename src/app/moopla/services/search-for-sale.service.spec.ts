import { TestBed } from '@angular/core/testing';

import { SearchForSaleService } from './search-for-sale.service';

describe('SearchForSaleService', () => {
  let service: SearchForSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchForSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
