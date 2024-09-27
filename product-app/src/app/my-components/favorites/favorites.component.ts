import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = []; // Array to store favorite photos

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFavorites(); // Load favorites when the component initializes
  }

  // Load favorite photos from localStorage
  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites).map((photo: any) => ({
        ...photo,
        url: `https://picsum.photos/id/${photo.id}/200/300` // Use the static ID for photo URL
      }));
    }
  }

  // Navigate to the single photo detail page
  viewPhoto(photo: any) {
    this.router.navigate(['/photos', photo.id]);
  }
}
