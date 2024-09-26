import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit {
  photos: any[] = [];
  loading = false;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.loading = true;
    setTimeout(() => {
      this.http.get<any[]>(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=6`).subscribe(
        data => {
          this.photos = this.photos.concat(data);
          this.loading = false;
          this.currentPage++;
        },
        error => {
          this.loading = false;
        }
      );
    }, Math.random() * 100 + 200);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const element = event.target;

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const offsetHeight = element.offsetHeight;

    // Check if the user is at the bottom of the container
    if (scrollTop + offsetHeight >= scrollHeight - 1 && !this.loading) {
      this.loadPhotos();
    }
  }

  addToFavorites(photo: any) {
    // Logic to add the photo to favorites
  }
}
