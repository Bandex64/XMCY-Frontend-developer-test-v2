import { Injectable } from '@angular/core';
import { FAVORITES_LOCAL_STORAGE_KEY } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storage: Storage = window.localStorage;
  private favoriteImageUrls: string[];

  constructor() { 
    const items = this.storage.getItem(FAVORITES_LOCAL_STORAGE_KEY);

    this.favoriteImageUrls = items ? items.split(',') : [];
  }

  getFavoriteImageUrls(): string[] {
    return this.favoriteImageUrls;
  }

  addImageUrl(url: string) {
    this.favoriteImageUrls.push(url);
    this.storage.setItem(FAVORITES_LOCAL_STORAGE_KEY, this.favoriteImageUrls.toString());
  }

  removeImageUrl(url: string) {
    const index = this.favoriteImageUrls.indexOf(url);

    this.favoriteImageUrls.splice(index, 1);
    this.storage.setItem(FAVORITES_LOCAL_STORAGE_KEY, this.favoriteImageUrls.toString());
  }
}
