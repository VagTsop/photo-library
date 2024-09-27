import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit {
  photos: any[] = []; // Store photos here
  loading = false; // Show loader when fetching data
  currentPage = 1; // Track current page for pagination
  totalPhotos = 100; // Arbitrary number, adjust as needed

  constructor() {}

  ngOnInit() {
    this.loadPhotos();
  }

  // Load photos with a simulated delay to emulate an API call
  loadPhotos() {
    if (this.loading) return; // Prevent multiple triggers while loading

    this.loading = true; // Show loader while loading photos

    // Simulate a delay between 200-300ms for fetching photos
    const randomDelay = Math.random() * 100 + 200;
    const minSpinnerTime = 300; // Minimum spinner display time

    setTimeout(() => {
      // Fetch 6 new random photos from Picsum using static IDs
      const newPhotos = Array(6).fill(0).map((_, index) => ({
        id: this.currentPage * 6 + index, // Unique static ID for each photo
        url: `https://picsum.photos/id/${this.currentPage * 6 + index}/200/300`, // Use static ID for the photo URL
        author: `Author ${this.currentPage * 6 + index}` // Example author data
      }));

      this.photos = [...this.photos, ...newPhotos]; // Append new photos to the list

      // After photos are loaded, ensure minimum spinner display time
      setTimeout(() => {
        this.loading = false; // Hide loader after minimum display time
      }, minSpinnerTime);

      this.currentPage++; // Increase current page for next load
    }, randomDelay);
  }

  // Infinite scroll logic: load photos when scrolling near bottom
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    // Check if 90% of the page has been scrolled
    const scrollPercentage = (scrollTop + viewportHeight) / totalHeight;
    if (scrollPercentage > 0.9 && !this.loading) {
      console.log(`Scrolled to ${Math.round(scrollPercentage * 100)}%`);
      this.loadPhotos(); // Trigger photo loading when scrolled near bottom
    }
  }

  // Add a photo to the favorites list in localStorage
  addToFavorites(photo: any) {
    let favorites = this.getFavorites(); // Retrieve current favorites list
    const isAlreadyFavorite = favorites.some((fav) => fav.id === photo.id); // Check if photo is already a favorite

    if (!isAlreadyFavorite) {
      favorites.push(photo); // Add photo if it's not already a favorite
      localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
      console.log('Added to favorites:', photo);
    } else {
      console.log('Photo is already in favorites.');
    }
  }

  // Helper function to get favorites from localStorage
  getFavorites(): any[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
}
