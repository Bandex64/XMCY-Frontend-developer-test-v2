import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

import { SinglePhotoComponent } from './single-photo.component';

const mockImageUrl = 'random_image_url';
const mockActivatedRoute =  { 
  snapshot: {
    paramMap: {
      get: (key: string) => key
    } 
  }
};
const mockFavoritesService = { removeImageUrl: (url: string) => url };

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;

  beforeEach(async () => {
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue(mockImageUrl);

    await TestBed.configureTestingModule({
      declarations: [ SinglePhotoComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: FavoritesService, useValue: mockFavoritesService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image with the url received in a url parameter', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img') as HTMLElement;

    expect(img).toBeDefined();
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledOnceWith('id');
    expect(fixture.componentInstance.imageUrl).toEqual(mockImageUrl);
  });

  it('should render the button for removing the given image from the list of favorites', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('#btn-remove-favorites') as HTMLElement;

    expect(btn).toBeDefined();
  });

  it('should remove the given image from the list of favorites when the remove button is clicked by the user', fakeAsync(() => {
    spyOn(mockFavoritesService, 'removeImageUrl');

    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('#btn-remove-favorites') as HTMLElement;

    btn.click();
    tick();

    expect(mockFavoritesService.removeImageUrl).toHaveBeenCalledOnceWith(mockImageUrl);
  }));
});
