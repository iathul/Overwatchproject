import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { NotificationService } from '../utility/notification.service'


@Injectable({
  providedIn: 'root'
})
export class LookoutService {

  private serverAdd =`${environment.serverAdd}`
  constructor(
                private http: HttpClient,  
                private notify:NotificationService
  ) { }
  
  getImages(){
   return this.http.get<any>(`${this.serverAdd}/getalldata`)
  }

}


