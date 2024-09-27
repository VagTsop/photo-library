import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private currentPage = 1;

  constructor() {}

  // Load photos with a simulated delay to emulate an API call
  loadPhotos(): Promise<any[]> {
    return new Promise((resolve) => {
      // Simulate a delay between 200-300ms for fetching photos
      const randomDelay = Math.random() * 100 + 200;
      const minSpinnerTime = 300; // Minimum spinner display time

      setTimeout(() => {
        // Fetch 6 new static photos
        const newPhotos = Array(6).fill(0).map((_, index) => {
          const staticId = this.currentPage * 6 + index;
          return {
            id: staticId, // Unique static ID for each photo
            url: `https://picsum.photos/id/${staticId}/200/300`, // Static image URL based on staticId
            author: `Author ${staticId}`, // Use staticId for author too for consistency
            staticId: staticId // Store the static ID for favorites functionality
          };
        });
        this.currentPage++;
        resolve(newPhotos);
      }, randomDelay + minSpinnerTime);
    });
  }

  // Get favorites from localStorage
  getFavorites(): any[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  // Add a photo to favorites in localStorage
  addToFavorites(photo: any): void {
    let favorites = this.getFavorites();
    const isAlreadyFavorite = favorites.some((fav) => fav.staticId === photo.staticId);

    if (!isAlreadyFavorite) {
      favorites.push(photo);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Added to favorites:', photo);
    } else {
      console.log('Photo is already in favorites.');
    }
  }

  // Remove a photo from favorites in localStorage
  removeFromFavorites(photoId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav) => fav.id !== photoId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Get a single photo by ID from favorites
  getPhotoById(photoId: number): any {
    const favorites = this.getFavorites();
    return favorites.find((fav) => fav.id === photoId);
  }
}
