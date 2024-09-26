import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './my-components/favorites/favorites.component';
import { PhotoDetailComponent } from './my-components/photo-detail/photo-detail.component';
import { PhotosComponent } from './my-components/photos/photos.component';


const routes: Routes = [
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  { path: 'photos', component: PhotosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
