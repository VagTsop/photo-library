import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {
  photo: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const photoId = this.route.snapshot.paramMap.get('id');
    // Load photo by ID
  }

  removeFromFavorites() {
    // Logic to remove the photo from favorites
  }
}
