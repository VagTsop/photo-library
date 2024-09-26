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


  // Logic to add a photo to favorites (you can implement this as needed)
  addToFavorites(photo: any) {
    // Add to favorites functionality here
    console.log('Added to favorites:', photo);
  }
}
