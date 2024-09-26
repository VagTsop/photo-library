import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFavorites(); // Load favorites when the component initializes
  }

  // Load favorites from local storage
  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  // Remove a photo from favorites
  removeFromFavorites(photo: any) {
    this.favorites = this.favorites.filter(fav => fav.id !== photo.id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites)); // Update local storage
  }

  // Navigate to single photo page
  viewPhoto(photo: any) {
    this.router.navigate(['/photos', photo.id]);
  }

  
}
