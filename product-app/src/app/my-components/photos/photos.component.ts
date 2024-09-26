import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit {
  photos: any[] = []; // Store photos here
  loading = false; // Show loader when fetching data
  currentPage = 1; // Simulate pagination
  totalPhotos = 100; // Arbitrary number, adjust as needed

  constructor() {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    if (this.loading) return; // Prevent multiple triggers while loading

    this.loading = true; // Show loader while loading photos

    // Simulate a delay between 200-300ms for fetching photos
    const randomDelay = Math.random() * 100 + 200;

    // Define a minimum spinner display time (500ms)
    const minSpinnerTime = 300;

    const loadTime = Math.max(randomDelay, minSpinnerTime);

    setTimeout(() => {
      // Fetch 6 new random photos from Picsum using static IDs
      const newPhotos = Array(6).fill(0).map((_, index) => ({
        id: this.currentPage * 6 + index, // Unique static ID for each photo
        url: `https://picsum.photos/id/${this.currentPage * 6 + index}/200/300`, // Use the static ID for the photo URL
        author: `Author ${this.currentPage * 6 + index}` // Example author data
      }));

      this.photos = this.photos.concat(newPhotos); // Append new photos to the list

      // After photos are loaded, keep the spinner visible for the minimum time
      setTimeout(() => {
        this.loading = false; // Hide loader after the minimum time is up
      }, minSpinnerTime);

      // Emulate pagination, increase currentPage for next load
      this.currentPage++;
    }, randomDelay);
  }


  // Infinite scroll logic: trigger loadPhotos when scrolling near bottom
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Calculate the scroll position
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    // Calculate the percentage of the page that has been scrolled
    const scrollPercentage = (scrollTop + viewportHeight) / totalHeight;

    // If 90% of the page has been scrolled and loading is not already happening
    if (scrollPercentage > 0.9 && !this.loading) {
      console.log(`Scrolled to ${Math.round(scrollPercentage * 100)}%`);
      this.loadPhotos(); // Trigger the loading of more photos
    }
  }


  addToFavorites(photo: any) {
    // Get the existing favorites array from local storage
    let favorites = this.getFavorites(); // This retrieves the current favorites list

    // Check if the photo is already in the favorites list (by its unique ID)
    const isAlreadyFavorite = favorites.some((fav) => fav.id === photo.id);

    if (!isAlreadyFavorite) {
      // Add the photo to the favorites array
      favorites.push(photo);

      // Save the updated array back to local storage
      localStorage.setItem('favorites', JSON.stringify(favorites));

      console.log('Added to favorites:', photo);
    } else {
      console.log('Photo is already in favorites.');
    }
  }

  // Helper function to get favorites from local storage
  getFavorites(): any[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }



}
