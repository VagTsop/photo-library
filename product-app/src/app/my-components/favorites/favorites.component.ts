import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    // Load favorites from local storage or a service
  }

  removeFromFavorites(photo: any) {
    // Logic to remove the photo from favorites
  }
}
