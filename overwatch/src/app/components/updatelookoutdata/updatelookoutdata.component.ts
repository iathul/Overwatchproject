import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LookoutService  } from '../../service/lookout/lookout.service'
import { AuthService } from '../../service/auth.service'
import { NotificationService } from '../../service/utility/notification.service'
import { HttpClient } from '@angular/common/http';
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
  }


  submit(){
    const fd = new FormData();
    fd.append('name',this.name)
    fd.append('crimeNumber',this.crimeNumber)
    for(var i = 0;i<this.selectedFile.length;i++){
      fd.append('image',this.selectedFile[i])
    }
    this.http.put(`${this.serverAdd}/updatedata/${this.id}/${this._id}`,fd)
    .subscribe(res => {
      this.message = res
      this.notify.showSucess(this.message.message,'Success')
    },err=>{
      if(err){
        console.log(err)
        this.notify.showError('Something went wrong','Error')
      }
    })       
  }

}
