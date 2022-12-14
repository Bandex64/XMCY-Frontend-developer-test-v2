import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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

@Component({})
class DummyComponent {}

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;

  beforeEach(async () => {
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue(mockImageUrl);

    await TestBed.configureTestingModule({
      declarations: [ SinglePhotoComponent ],
      imports: [RouterTestingModule.withRoutes([{path: 'favorites', component: DummyComponent}])],
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

    expect(img).toBeTruthy();
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledOnceWith('id');
    expect(fixture.componentInstance.imageUrl).toEqual(mockImageUrl);
  });

  it('should render the button for removing the given image from the list of favorites', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('#btn-remove-favorites') as HTMLElement;

    expect(btn).toBeTruthy();
  });

  it('should remove the given image from the list of favorites when the remove button is clicked by the user', fakeAsync(() => {
    spyOn(mockFavoritesService, 'removeImageUrl');

    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('#btn-remove-favorites') as HTMLElement;

    btn.click();
    tick();

    expect(mockFavoritesService.removeImageUrl).toHaveBeenCalledOnceWith(mockImageUrl);
  }));

  it('shoudld navigate back to the favorites page when image was removed', fakeAsync(() => {
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('#btn-remove-favorites') as HTMLElement;

    btn.click();
    tick();

    expect(router.navigate).toHaveBeenCalledOnceWith(['favorites']);
  }));
});
