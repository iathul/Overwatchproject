import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
//import { ActivatedRoute, Router, ParamMap } from '@angular/router'
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
  isFile:boolean = false
  isProgress:boolean  = false
  validateMsg:boolean = false
  progressPercent:any
  constructor(
              private http:HttpClient, 
              private notify:NotificationService,
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
    if(this.selectedFile.length == 3){
      this.isFile = true
    }else{
      this.validateMsg = true
    }
  }

  
  submit(){
    const fd = new FormData();
    fd.append('name',this.name)
    fd.append('crimeNumber',this.crimeNumber)
    for(var i = 0;i<this.selectedFile.length;i++){
      fd.append('image',this.selectedFile[i])
    }
    this.http.post(`${this.serverAdd}/create/${this.id}`,fd,{
      reportProgress:true,
      observe: 'events'
    })
  
    /*.subscribe(res => {
      console.log(res)
      this.message = res
      localStorage.setItem('culpritId',this.message.culpritId)
      
      this.notify.showSucess(this.message.message,'Success')
    },err=>{
      if(err){
        this.notify.showError('Something went wrong','Error')
      }
    }) */    
    
    .subscribe(event=>{
      if(event.type === HttpEventType.UploadProgress){
        this.isProgress = true
        this.progressPercent = Math.round(event.loaded/event.total*100)
      }else if(event.type === HttpEventType.Response){
        this.message = event.body
        this.notify.showSucess(this.message.message,'Success')
      }
    },err=>{
      if(err){
        this.notify.showError('Something went wrong, Please Try again','Sorry')
      }
    })
  }
}









 




  

