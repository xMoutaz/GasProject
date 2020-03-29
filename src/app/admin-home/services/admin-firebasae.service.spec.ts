import { TestBed } from '@angular/core/testing';

import { AdminFirebasaeService } from './admin-firebasae.service';

describe('AdminFirebasaeService', () => {
  let service: AdminFirebasaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFirebasaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
