import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {
  photo: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const photoId = this.route.snapshot.paramMap.get('id'); // Get photo ID from URL
    if (photoId) {
      this.loadPhoto(photoId); // Load photo using ID
    } else {
      this.router.navigate(['/favorites']); // Redirect if no valid ID is provided
    }
  }

  // Load the photo from localStorage using the photoId
  loadPhoto(photoId: string) {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const numericPhotoId = Number(photoId); // Ensure numeric comparison
      this.photo = favorites.find((fav) => fav.id === numericPhotoId) || {}; // Find photo by ID
      if (!this.photo || !this.photo.url) {
        console.warn('Photo not found'); // Log if photo is not found
      }
    }
  }

  // Remove the photo from favorites and navigate back to the favorites screen
  removeFromFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      let favorites = JSON.parse(storedFavorites);
      favorites = favorites.filter((fav) => fav.id !== this.photo.id); // Remove the current photo from favorites
      localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
    }
    this.router.navigate(['/favorites']); // Navigate back to favorites
  }
}
