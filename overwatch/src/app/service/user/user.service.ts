import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private serverAdd =`${environment.serverAdd}`
  _id:any
  constructor( private http: HttpClient,
               private auth:AuthService
              ) { }

  
             
  getUserData(){
    this._id = this.auth.getUserId()
    return this.http.get<any>(`${this.serverAdd}/user/${this._id}`)
  }


  addUserData(user){
    this._id = this.auth.getUserId()
    return this.http.put<any>(`${this.serverAdd}/user/updateuserdata/${this._id}`,user)
  }

  getUserLookoutData(){
    this._id = this.auth.getUserId()
    return this.http.get<any>(`${this.serverAdd}/user/getuserlookoutdata/${this._id}`)
  }

  // Delete User Lookout Data
  deleteLookoutData(id){
    this._id = this.auth.getUserId()
    return this.http.delete(`${this.serverAdd}/deletedata/${id}/${this._id}`)
  }

  //Update user email

  updateEmail(email){
    this._id = this.auth.getUserId()
    return this.http.put<any>(`${this.serverAdd}/user/updateuseremail/${this._id}`,email)
  }

  updatePassword(password){
    this._id = this.auth.getUserId()
    return this.http.put<any>(`${this.serverAdd}/user/updatepassword/${this._id}`,password)
  }
}
