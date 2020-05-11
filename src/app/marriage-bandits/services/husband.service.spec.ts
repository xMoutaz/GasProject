import { TestBed } from '@angular/core/testing';

import { HusbandService } from './husband.service';

describe('HusbandService', () => {
  let service: HusbandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HusbandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
