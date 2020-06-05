import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { NotificationService } from '../../service/utility/notification.service'
import { AuthService } from '../../service/auth.service'
import { environment } from '../../../environments/environment'
import { MatDialog } from '@angular/material'
import { AlertComponent } from '../alert/alert.component'


@Component({
  selector: 'app-uploadimages',
  templateUrl: './uploadimages.component.html',
  styleUrls: ['./uploadimages.component.css']
})
export class UploadimagesComponent implements OnInit {

  selectedFile = []
  public name ="" 
  public crimeNumber =""
  message:any
  id:any
  private serverAdd =`${environment.serverAdd}`

  constructor(
              private http:HttpClient, 
              private notify:NotificationService,
              private route:ActivatedRoute,
              private router:Router,
              private auth: AuthService,
              private dialog:MatDialog
              ) { }

  ngOnInit() {
  
    this.id = this.auth.getUserId()

    this.dialog.open(AlertComponent)
 }
  
  onFileChange(event){
    for(var i = 0;i<event.target.files.length;i++){
      this.selectedFile.push(event.target.files[i])
    }
  }

  
  submit(){
    const fd = new FormData();
    fd.append('name',this.name)
    fd.append('crimeNumber',this.crimeNumber)
    for(var i = 0;i<this.selectedFile.length;i++){
      fd.append('image',this.selectedFile[i])
    }
    this.http.post(`${this.serverAdd}/create/${this.id}`,fd)
    .subscribe(res => {
      this.message = res
      localStorage.setItem('culpritId',this.message.culpritId)
      this.notify.showSucess(this.message.message,'Success')
    },err=>{
      if(err){
        this.notify.showError('Something went wrong','Error')
      }
    })       
  }
}









 




  

