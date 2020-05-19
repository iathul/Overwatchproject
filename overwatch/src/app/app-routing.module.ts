import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { AuthGuard } from './guards/auth.guard'
import { UploadimagesComponent } from './components/uploadimages/uploadimages.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProfileComponent } from './components/profile/profile.component'
import { HomeComponent } from './components/home/home.component';
import {SearchculpritComponent } from './components/searchculprit/searchculprit.component'
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path :'home', component:HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createlookoutdata', 
    component:UploadimagesComponent,
    canActivate:[AuthGuard]
  },
  { path: 'search', 
    component:SearchculpritComponent,
    canActivate:[AuthGuard] },
  { path: 'gallery',
    component:GalleryComponent,
    canActivate:[AuthGuard]
  },
  { path :'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  { path : '**', component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
