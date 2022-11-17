import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteImageUrls: string[];

  constructor(private favoritesService: FavoritesService, private router: Router) {
    this.favoriteImageUrls = this.favoritesService.getFavoriteImageUrls();
  }

  imageClicked(url: string) {
    this.router.navigate(['photos',url]);
  }
}
