import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {
  imageUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    console.log(this.route.url);
    this.imageUrl = this.route.snapshot.paramMap.get('id') || '';
  }

  removeFromFavorites() {
    this.favoritesService.removeImageUrl(this.imageUrl);
    this.router.navigate(['favorites']);
  }
}
