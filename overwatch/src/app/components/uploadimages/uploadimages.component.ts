import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { NotificationService } from '../../service/utility/notification.service'

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
  _id:any
  constructor(
              private http:HttpClient, 
              private notify:NotificationService,
              private route:ActivatedRoute,
              private router:Router
              ) { }

  ngOnInit() {

  this.route.paramMap.subscribe((params:ParamMap)=>{
    let id = params.get('id');
    this._id = id
  })

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
    this.http.post(`http://localhost:3000/api/create/${this._id}`,fd)
    .subscribe(res=>{
      this.message = res
      this.notify.showSucess(this.message.message,'Success')
    },err=>{
      if(err){
        this.notify.showError('Something went wrong','Error')
      }
    })       
  }
}









 




  

