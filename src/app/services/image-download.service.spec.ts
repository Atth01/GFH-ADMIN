import { TestBed } from '@angular/core/testing';

import { ImageDownloadService } from './image-download.service';

describe('ImageDownloadService', () => {
  let service: ImageDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
