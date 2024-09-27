import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoDetailComponent } from './my-components/photo-detail/photo-detail.component';
import { PhotosComponent } from './my-components/photos/photos.component';
import { FavoritesComponent } from './my-components/favorites/favorites.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './my-components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotosComponent,
    PhotoDetailComponent,
    FavoritesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
