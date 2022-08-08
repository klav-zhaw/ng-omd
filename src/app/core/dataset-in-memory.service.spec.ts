import { TestBed } from '@angular/core/testing';

import { DatasetInMemoryService } from './dataset-in-memory.service';

describe('DatasetInMemoryService', () => {
  let service: DatasetInMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetInMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
