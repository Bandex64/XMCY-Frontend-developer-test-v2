import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { ImageLoaderService } from '../services/image.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  imageUrls: string[] = []

  canLoadAdditionalImages: boolean = false;

  constructor(private imageService: ImageLoaderService, private favoritesService: FavoritesService) {
    for (let i = 0; i < 12; ++i) {
      this.imageService.getRandomImage().subscribe((url) => this.imageUrls.push(url));
    }

    this.canLoadAdditionalImages = true;

  }

  addToFavorites(url: string) {
    this.favoritesService.addImageUrl(url);
  }

  bottomReached() {
    for (let i = 0; i < 4; i++) {
      this.imageService.getRandomImage().subscribe((url) => this.imageUrls.push(url));
    }
  }
}
