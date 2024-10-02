import { Component, OnInit, HostListener } from '@angular/core';
import { PhotoService } from 'src/app/service/photo-service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit {
  photos: any[] = []; // Store photos here
  loading = false; // Show loader when fetching data

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    if (this.loading) return;

    this.loading = true; // Show loader while loading photos

    this.photoService.loadPhotos().then((newPhotos) => {
      this.photos = [...this.photos, ...newPhotos]; // Append new photos to the list
      this.loading = false; // Hide loader after photos are loaded
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    const scrollPercentage = (scrollTop + viewportHeight) / totalHeight;
    if (scrollPercentage > 0.9 && !this.loading) {
      this.loadPhotos();
    }
  }

  addToFavorites(photo: any) {
    this.photoService.addToFavorites(photo);
  }

  getFavorites(): any[] {
    return this.photoService.getFavorites();
  }
}
