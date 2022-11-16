import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteImageUrls: string[];

  constructor(private favoritesService: FavoritesService) {
    this.favoriteImageUrls = this.favoritesService.getFavoriteImageUrls();
  }
}
