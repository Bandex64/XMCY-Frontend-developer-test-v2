import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { ImageLoaderService } from '../services/image.service';

import { PhotosComponent } from './photos.component';

let mockCounter = 0;

const mockImageLoaderService = { getRandomImage: () => of(`random_image_url_${mockCounter++}`) };
const mockFavoritesService = { addImageUrl: (url: string) => url };

@Component({
  template: '<ng-content></ng-content>',
  selector: 'app-image-grid'
})
class MockImageGridComponent {
  @Input() imageUrls = [];

  @Output() imageClicked = new EventEmitter();
}

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
      declarations: [ PhotosComponent, MockScrollEndIndicator, MockImageGridComponent ],
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

  it('should render the ImageGridComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imageGrid = compiled.querySelector('app-image-grid');

    expect(imageGrid).toBeTruthy();
  });


  it('should pass 12 image urls to the grid component initially', () => {    
    const imageuRls = fixture.debugElement.query(By.directive(MockImageGridComponent)).componentInstance.imageUrls;
    fixture.detectChanges();

    expect(imageuRls.length).toEqual(12);
    imageuRls.forEach((url: string, index: number) => {
      expect(url).toEqual(`random_image_url_${index}`);
    });
  });


  it('should add the proper image url to the favorites when ImageGridComponent emits a click event', () => {
    const mockUrl = 'clicked_image_url';

    spyOn(mockFavoritesService, 'addImageUrl');

    fixture.debugElement.query(By.directive(MockImageGridComponent)).componentInstance.imageClicked.emit(mockUrl);
    fixture.detectChanges();

    expect(mockFavoritesService.addImageUrl).toHaveBeenCalledWith(mockUrl);
  });

  it('should project the ScrollEndIndicatorCoponent to the ImageGridComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const scrollEndIndicator = compiled.querySelector('app-scroll-end-indicator') as HTMLElement;

    expect(scrollEndIndicator).toBeTruthy();
  });

  it('should load 4 more images when bottom of the page has been reached', () => {
    spyOn(mockFavoritesService, 'addImageUrl');

    const imageuRls = fixture.debugElement.query(By.directive(MockImageGridComponent)).componentInstance.imageUrls;

    fixture.debugElement.query(By.directive(MockScrollEndIndicator)).componentInstance.scrollEndReached.emit();
    fixture.detectChanges();

    expect(imageuRls.length).toEqual(16);
    imageuRls.forEach((url: string, index: number) => {
      expect(url).toEqual(`random_image_url_${index}`);
    });
  });
});
