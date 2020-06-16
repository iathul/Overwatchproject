import { Component,OnInit } from '@angular/core';
import { AuthService } from "./service/auth.service"
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
constructor(public auth: AuthService, private router:Router){}
  

  

  viewProfile(){
    this.router.navigate(['/profile',this.auth.getUserId()])
  }

}
