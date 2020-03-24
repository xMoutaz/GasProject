import { TestBed } from '@angular/core/testing';

import { UserMdbService } from './user-mdb.service';

describe('UserMdbService', () => {
  let service: UserMdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
