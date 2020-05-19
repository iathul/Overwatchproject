import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UploadimagesComponent } from './uploadimages/uploadimages.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SearchculpritComponent } from './searchculprit/searchculprit.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    UploadimagesComponent, 
    GalleryComponent, 
    ProfileComponent, 
    HomeComponent, SearchculpritComponent, PagenotfoundComponent, 
  ],
  imports: [ CommonModule,MaterialModule, FormsModule,ReactiveFormsModule,],
  
  
})
export class ComponentsModule { }
