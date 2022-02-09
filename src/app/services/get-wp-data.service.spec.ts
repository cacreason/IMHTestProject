import { TestBed } from '@angular/core/testing';

import { GetWpDataService } from './get-wp-data.service';

describe('GetWpDataService', () => {
  let service: GetWpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
