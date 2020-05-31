import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { NotificationService } from '../service/utility/notification.service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverAdd =`${environment.serverAdd}`
  errMsg:any
  constructor(
              private http: HttpClient, 
              private router: Router, 
              private notify:NotificationService) { }


  registerUser(user){
    return this.http.post<any>(`${this.serverAdd}/register`, user);
  }

  
  loginUser(user){
    return this.http.post<any>(`${this.serverAdd}/login`, user)
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

  getUserName(){
    return localStorage.getItem('userName')
  }

  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    this.router.navigate(['/login']);
    this.notify.showSucess('Signout Sucess','Sucess')
    setTimeout(()=>{
      window.location.reload()
    },500)
  }

}
