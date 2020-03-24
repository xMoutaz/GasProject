import { TestBed } from '@angular/core/testing';

import { AddressMdbService } from './address-mdb.service';

describe('AddressMdbService', () => {
  let service: AddressMdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressMdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
