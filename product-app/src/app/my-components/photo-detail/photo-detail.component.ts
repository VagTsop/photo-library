import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {
  photo: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const photoId: string | null = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.loadPhoto(photoId); // Call the function with a non-null photoId
    } else {
      // Handle the case where photoId is null, like redirecting to a different page
      this.router.navigate(['/favorites']); // Or show an error message
    }
  }
  // Load photo by ID from favorites
  loadPhoto(photoId: string) {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      this.photo = favorites.find(fav => fav.id === photoId);
    }
  }

  // Remove the photo from favorites and navigate back to the favorites screen
  removeFromFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      let favorites = JSON.parse(storedFavorites);
      favorites = favorites.filter(fav => fav.id !== this.photo.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    this.router.navigate(['/favorites']); // Redirect to favorites after removal
  }
}
