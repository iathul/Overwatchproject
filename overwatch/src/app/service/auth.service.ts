import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverAdd = "http://localhost:3000/api"
  constructor(private http: HttpClient, private router: Router) { }


  registerUser(user){
    return this.http.post<any>(`${this.serverAdd}/register`, user);
  }

  loginUser(user){
    return this.http.post<any>(`${this.serverAdd}/login`, user);
  }

  

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

 
  

}
