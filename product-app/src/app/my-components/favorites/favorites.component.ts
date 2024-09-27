import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/service/photo-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private router: Router, private photoService: PhotoService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.photoService.getFavorites();
  }

  viewPhoto(photo: any) {
    this.router.navigate(['/photos', photo.staticId]);
  }
}
