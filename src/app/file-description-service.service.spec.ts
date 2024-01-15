import { TestBed } from '@angular/core/testing';

import { FileDescriptionServiceService } from './file-description-service.service';

describe('FileDescriptionServiceService', () => {
  let service: FileDescriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDescriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
