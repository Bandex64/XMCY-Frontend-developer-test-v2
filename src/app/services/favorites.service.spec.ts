import { TestBed } from '@angular/core/testing';
import { window } from 'rxjs';
import { FAVORITES_LOCAL_STORAGE_KEY } from '../app-constants';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  beforeEach(() => localStorage.clear());

  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(FavoritesService);

    expect(service).toBeTruthy();
  });

  it('should load all the image urls stored in the local storage under a given key when being initilaized', () => {
    spyOn(localStorage, 'getItem').and.returnValue('url1,url2,url3');

    TestBed.configureTestingModule({});
    const service = TestBed.inject(FavoritesService);

    expect(service.getFavoriteImageUrls()).toEqual(['url1', 'url2', 'url3']);
  });

  it('should create an empty array when no urls are stored in the local storage', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(FavoritesService);

    expect(service.getFavoriteImageUrls()).toEqual([]);
  });

  it('should add the given image url to the favorties list and also update the local storage by calling the addImage method', () => {
    spyOn(localStorage, 'getItem').and.returnValue('url1,url2,url3');
    spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({});
    const service = TestBed.inject(FavoritesService);

    service.addImageUrl('url4');

    expect(service.getFavoriteImageUrls()).toEqual(['url1', 'url2', 'url3', 'url4']);
    expect(localStorage.setItem).toHaveBeenCalledOnceWith(FAVORITES_LOCAL_STORAGE_KEY, 'url1,url2,url3,url4');
  });

  it('should remove the given image url to the favorties list and also update the local storage by calling the removeImage method', () => {
    spyOn(localStorage, 'getItem').and.returnValue('url1,url2,url3');
    spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({});
    const service = TestBed.inject(FavoritesService);

    service.removeImageUrl('url3');

    expect(service.getFavoriteImageUrls()).toEqual(['url1', 'url2']);
    expect(localStorage.setItem).toHaveBeenCalledOnceWith(FAVORITES_LOCAL_STORAGE_KEY, 'url1,url2');
  });
});
