import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { ImageLoaderService } from '../services/image.service';

import { PhotosComponent } from './photos.component';

let mockCounter = 0;

const mockImageLoaderService = { getRandomImage: () => of(`random_image_url_${mockCounter++}`) };
const mockFavoritesService = { addImageUrl: (url: string) => url };

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async () => {
    mockCounter = 0;

    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [
        { provide: ImageLoaderService, useValue: mockImageLoaderService },
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 12 image elements initially', () => {    
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toEqual(12);
  });

  it('should set the url received from the image service as image source when initalizing', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    images.forEach((img, index) => {
      expect(img.getAttribute('src')).toEqual(`random_image_url_${index}`);
    });
  });

  it('should add the image to the favorites when user clicks on it', fakeAsync(() => {
    spyOn(mockFavoritesService, 'addImageUrl');

    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    images.forEach((img, index) => {
      img.click();
      tick();

      expect(mockFavoritesService.addImageUrl).toHaveBeenCalledWith(`random_image_url_${index}`);
    });
  }));
});
