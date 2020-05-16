import { TestBed } from '@angular/core/testing';

import { WifeService } from './wife.service';

describe('WifeService', () => {
  let service: WifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
