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

  // Simulate an API call to load photos with a random delay
  loadPhotos() {
    if (this.loading) return; // Prevent multiple triggers while loading
    console.log(this.loading)
    this.loading = true; // Show loader while loading photos

    // Simulate a delay between 200-300ms
    const randomDelay = Math.random() * 100 + 200;

    setTimeout(() => {
      // Fetch 6 new random photos from Picsum
      const newPhotos = Array(6).fill(0).map(() => ({
        url: `https://picsum.photos/200/300?random=${Math.random()}`
      }));

      this.photos = this.photos.concat(newPhotos); // Append new photos to the list
      this.loading = false; // Hide loader after photos are loaded

      // Emulate pagination, increase currentPage for next load
      this.currentPage++;
    }, randomDelay);
  }

  // Infinite scroll logic: trigger loadPhotos when scrolling near bottom
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 50 && !this.loading) { // Adjusted to ensure we load a bit before reaching the bottom
      // Load more photos if user scrolls to bottom and we are not currently loading
      this.loadPhotos();
    }
  }

  // Logic to add a photo to favorites (you can implement this as needed)
  addToFavorites(photo: any) {
    // Add to favorites functionality here
    console.log('Added to favorites:', photo);
  }
}
