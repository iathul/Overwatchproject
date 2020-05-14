import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { AuthGuard } from './guards/auth.guard'
import { UploadimagesComponent } from './components/uploadimages/uploadimages.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import {  ProfileComponent } from './components/profile/profile.component'
import { HomeComponent } from './components/home/home.component';
import {SearchculpritComponent } from './components/searchculprit/searchculprit.component'




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'fileupload', component:UploadimagesComponent},
  { path: 'gallery',component:GalleryComponent },
  { path :'profile',component:ProfileComponent },
  { path :'home', component:HomeComponent},
  { path: 'search', component:SearchculpritComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
