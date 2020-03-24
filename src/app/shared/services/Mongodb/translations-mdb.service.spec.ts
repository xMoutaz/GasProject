import { TestBed } from '@angular/core/testing';

import { TranslationsMdbService } from './translations-mdb.service';

describe('TranslationsMdbService', () => {
  let service: TranslationsMdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationsMdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
