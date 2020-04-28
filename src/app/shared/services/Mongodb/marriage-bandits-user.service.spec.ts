import { TestBed } from '@angular/core/testing';

import { MarriageBanditsUserService } from './marriage-bandits-user.service';

describe('MarriageBanditsUserService', () => {
  let service: MarriageBanditsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarriageBanditsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
