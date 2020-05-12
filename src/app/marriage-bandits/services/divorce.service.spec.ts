import { TestBed } from '@angular/core/testing';

import { DivorceService } from './divorce.service';

describe('DivorceService', () => {
  let service: DivorceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivorceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
