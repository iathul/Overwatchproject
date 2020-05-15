import { Injectable } from '@angular/core';
import { CanActivate, Router,} from '@angular/router';
import { AuthService } from '../service/auth.service'
import { NotificationService } from '../service/utility/notification.service'
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private auth:AuthService, private router:Router, private notify:NotificationService){}
  
  canActivate(): boolean{
    if (this.auth.loggedIn()){
      return true
    } else {
      this.router.navigate(['/login'])
      this.notify.showWarning('Please Login','Warning')
      return false 
    }
  }
  
}

