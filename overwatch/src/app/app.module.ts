import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'; 
import { ComponentsModule } from './components/components.module';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component'
import { TokenInterceptorService} from './service/token-interceptor/token-interceptor.service'
import { UpdateuserdataComponent } from './components/updateuserdata/updateuserdata.component'
import { AlertComponent } from './components/alert/alert.component'



@NgModule({
  declarations: [
    AppComponent,
   ],
   entryComponents:[UpdateprofileComponent,UpdateuserdataComponent,AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton:true
    }),
    

  ],
  providers: [AuthService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
  