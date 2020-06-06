import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LookoutService  } from '../../service/lookout/lookout.service'
import { AuthService } from '../../service/auth.service'
import { NotificationService } from '../../service/utility/notification.service'
import { HttpClient,HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { MatDialog } from '@angular/material'
import { AlertComponent } from '../alert/alert.component'

@Component({
  selector: 'app-updatelookoutdata',
  templateUrl: './updatelookoutdata.component.html',
  styleUrls: ['./updatelookoutdata.component.css']
})
export class UpdatelookoutdataComponent implements OnInit { 

  constructor( private route:ActivatedRoute,
               private lookout:LookoutService,
               private auth:AuthService,
               private notify:NotificationService,
               private http:HttpClient,
               private dialog:MatDialog) { }

  id:any
  selectedFile = []
  public name ="" 
  public crimeNumber =""
  _id:any
  message:any
  isFile:boolean = false
  isProgress:boolean  = false
  validateMsg:boolean = false
  progressPercent:any
  private serverAdd =`${environment.serverAdd}`

  ngOnInit(): void {

    this.dialog.open(AlertComponent)

    this.id = this.route.snapshot.paramMap.get('id')

    this.lookout.getLookOutData(this.id).subscribe(
      res=>{
        this.name = res.name
        this.crimeNumber = res.crimeNumber
      }
    )

    this._id = this.auth.getUserId()
    
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
    this.http.put(`${this.serverAdd}/updatedata/${this.id}/${this._id}`,fd,{
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
