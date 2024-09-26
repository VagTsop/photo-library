import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {
  photo: any = {}; // Initialize with an empty object

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const photoId: string | null = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.loadPhoto(photoId); // Call the function with the photoId
    } else {
      // Handle the case where photoId is null, redirect or show an error
      this.router.navigate(['/favorites']);
    }
  }

  // Load the photo by ID from the favorites stored in localStorage
  loadPhoto(photoId: string) {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      this.photo = favorites.find((fav: any) => fav.id === photoId) || {}; // Default to empty object if not found
    }
  }

  // Remove the photo from favorites and navigate back to the favorites screen
  removeFromFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      let favorites = JSON.parse(storedFavorites);
      favorites = favorites.filter((fav: any) => fav.id !== this.photo.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    this.router.navigate(['/favorites']); // Redirect to favorites after removal
  }
}
