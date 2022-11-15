import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoritesComponent } from "./favorites/favorites.component";
import { PhotosComponent } from "./photos/photos.component";
import { SinglePhotoComponent } from "./single-photo/single-photo.component";

const routes: Routes = [
    {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: 'photos/:id',
        component: SinglePhotoComponent
    },
    {
        path: '',
        component: PhotosComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }