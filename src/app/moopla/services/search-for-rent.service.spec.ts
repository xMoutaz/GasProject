import { TestBed } from '@angular/core/testing';

import { SearchForRentService } from './search-for-rent.service';

describe('SearchForRentService', () => {
  let service: SearchForRentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchForRentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
