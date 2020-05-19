import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { Router } from '@angular/router';
import { NotificationService } from '../service/utility/notification.service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  private serverAdd = "http://localhost:3000/api"
  errMsg:any
  constructor(
              private http: HttpClient, 
              private router: Router, 
              private notify:NotificationService) { }


  registerUser(user){
    return this.http.post<any>(`${this.serverAdd}/register`, user);
  }

  
loginUser(user){
  return this.http.post<any>(`${this.serverAdd}/login`, user).subscribe(
    res => {
      localStorage.setItem('token',res.token);
      localStorage.setItem('userId',res.user._id)
      this.router.navigate(['/createlookoutdata']); 
      this.notify.showSucess('Login Sucessfull','Sucess')
    },
    error => {
      if(error){
        this.errMsg = error.error.error
        this.notify.showError( this.errMsg,'Error')
      }
    }
  );
}

  

  

  getToken(){
    return localStorage.getItem('token');
    

  }

  loggedIn(){
    return !!localStorage.getItem('token'); 
    
  }
  getUserId(){
    return localStorage.getItem('userId');
    
    
  }

  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigate(['/login']);
    this.notify.showSucess('Signout Sucess','Sucess')
  }

 
  

}
