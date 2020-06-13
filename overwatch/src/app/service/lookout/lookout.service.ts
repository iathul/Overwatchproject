import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { AuthService } from '../auth.service'


@Injectable({
  providedIn: 'root'
})
export class LookoutService {

  _id:any
  private serverAdd =`${environment.serverAdd}`

  constructor(
                private http: HttpClient,
                private auth: AuthService  
              ) { }
  
  getImages(){
   return this.http.get<any>(`${this.serverAdd}/getalldata`)
  }

  getLookOutData(id){
    this._id = this.auth.getUserId()
    return this.http.get<any>(`${this.serverAdd}/getdata/${id}/${this._id}`)
  }

  searchCulprit(user){
    this._id = this.auth.getUserId()
    return this.http.post<any>(`${this.serverAdd}/search/${this._id}`,user)
  }

  find(id){
    this._id = this.auth.getUserId()
    return this.http.get<any>(`${this.serverAdd}/getdata/${id}/${this._id}`)
  }

  findOnCamera(path){
    //console.log(path)
    //return this.http.post<any>(`${this.serverAdd}/test`,path)
    return this.http.post<any>('http://localhost:5000/foo',path)  
    
    
  }
}


