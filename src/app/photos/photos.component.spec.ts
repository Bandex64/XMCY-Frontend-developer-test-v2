import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { ImageLoaderService } from '../services/image.service';

import { PhotosComponent } from './photos.component';
import { ScrollEndIndicatorComponent } from './scroll-end-indicator/scroll-end-indicator.component';

let mockCounter = 0;

const mockImageLoaderService = { getRandomImage: () => of(`random_image_url_${mockCounter++}`) };
const mockFavoritesService = { addImageUrl: (url: string) => url };

@Component({
  selector: 'app-scroll-end-indicator'
})
class MockScrollEndIndicator {
  @Output() scrollEndReached = new EventEmitter();

  emitValue() {
    this.scrollEndReached.emit();
  }
}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async () => {
    mockCounter = 0;

    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent, MockScrollEndIndicator ],
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

  it('should render the ScrollEndIndicatorCoponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const scrollEndIndicator = compiled.querySelector('app-scroll-end-indicator') as HTMLElement;

    expect(scrollEndIndicator).toBeDefined();
  });

  it('should load 4 more images when bottom of the page has been reched', () => {
    spyOn(mockFavoritesService, 'addImageUrl');

    fixture.debugElement.query(By.directive(MockScrollEndIndicator)).componentInstance.scrollEndReached.emit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toEqual(16);
    images.forEach((img, index) => {
      expect(img.getAttribute('src')).toEqual(`random_image_url_${index}`);
    });
  });
});
