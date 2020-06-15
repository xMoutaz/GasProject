import { TestBed } from '@angular/core/testing';

import { SearchInitialInputsService } from './search-initial-inputs.service';

describe('SearchInitialInputsService', () => {
  let service: SearchInitialInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInitialInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
