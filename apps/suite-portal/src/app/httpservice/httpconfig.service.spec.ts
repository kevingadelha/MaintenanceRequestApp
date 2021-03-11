import { TestBed } from '@angular/core/testing';

import { HTTPConfigService } from './httpconfig.service';

describe('HTTPConfigService', () => {
  let service: HTTPConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
