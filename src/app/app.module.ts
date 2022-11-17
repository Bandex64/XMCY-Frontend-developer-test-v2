import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AppRoutingModule } from './app.routing.module';
import { PhotosComponent } from './photos/photos.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ScrollEndIndicatorComponent } from './photos/scroll-end-indicator/scroll-end-indicator.component';
import { ImageGridComponent } from './image-grid/image-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    SinglePhotoComponent,
    FavoritesComponent,
    ScrollEndIndicatorComponent,
    ImageGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
