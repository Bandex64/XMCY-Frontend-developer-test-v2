import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ImageLoaderService } from './image.service';

describe('ImageLoaderService', () => {
  let service: ImageLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ImageLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
