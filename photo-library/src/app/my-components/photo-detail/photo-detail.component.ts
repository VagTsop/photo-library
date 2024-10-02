import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/service/photo-service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
})
export class PhotoDetailComponent implements OnInit {
  photo: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.loadPhoto(parseInt(photoId, 10));
    } else {
      this.router.navigate(['/favorites']);
    }
  }

  loadPhoto(photoId: number) {
    this.photo = this.photoService.getPhotoById(photoId) || {};
    if (!this.photo || !this.photo.url) {
      console.warn('Photo not found');
    }
  }

  removeFromFavorites() {
    this.photoService.removeFromFavorites(this.photo.id);
    this.router.navigate(['/favorites']);
  }
}
