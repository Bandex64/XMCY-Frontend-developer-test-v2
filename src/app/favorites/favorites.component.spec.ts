import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesService } from '../services/favorites.service';

import { FavoritesComponent } from './favorites.component';

const mockFavoriteUrls = ['url1', 'url2', 'url3', 'url4'];
const mockFavoritesService = { getFavoriteImageUrls: () => mockFavoriteUrls };

@Component({})
class DummyComponent {}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      imports: [RouterTestingModule.withRoutes([
        {path: '**', component: DummyComponent},
        {path: 'photos/:id', component: DummyComponent}]
      )],
      providers: [{provide: FavoritesService, useValue: mockFavoritesService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all the favorite images with the proper urls', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toEqual(mockFavoriteUrls.length);

    images.forEach((img, index) => {
      expect(img.getAttribute('src')).toEqual(mockFavoriteUrls[index]);;
    });
  });

  it('should naviagte to the proper router location when clicking on an image', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    images.forEach((img, index) => {
      img.click();
      tick();

      expect(router.url).toEqual(`/photos/${mockFavoriteUrls[index]}`)
    });
  }));
});
