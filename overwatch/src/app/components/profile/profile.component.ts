import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../service/utility/notification.service'
import { MatDialog } from '@angular/material'
import { environment } from '../../../environments/environment'
import { AuthService } from '../../service/auth.service'
import { UserService } from '../../service/user/user.service'
import { UpdateprofileComponent } from '../updateprofile/updateprofile.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   _id:any
  message:any
  fullName:any
  userEmail:any
  designation:any
  mobile_no:any
  station:any
  district:any
  state:any
  country:any
  profile_pic:any
  selectedFile = null     
  serverAdd =`${environment.serverAdd}`
  constructor(
            private http:HttpClient, 
            private notify:NotificationService,
            private auth: AuthService,
            public dialog: MatDialog,
            private user : UserService
  ) { }

  ngOnInit () {
    this._id = this.auth.getUserId()

    this.user.getUserData().subscribe(
      res=>{
        this.fullName    = res.name
        this.userEmail   = res.email
        this.designation = res.designation
        this.mobile_no   = res.mobile
        this.district    = res.district
        this.station     = res.station
        this.state       = res.state
        this.country     = res.country
        this.profile_pic = res.profile.path
      },
      
      
    )  
  }

  updateProfile(){
    this.dialog.open(UpdateprofileComponent);
  }

  onFileChange(event){
    this.selectedFile = event.target.files[0]
    const fd = new FormData();
    fd.append('profile-pic',this.selectedFile)
    this.http.put(`${this.serverAdd}/user/updateprofilepic/${this._id}`,fd)
    .subscribe(res=>{
      this.message = res
      this.notify.showSucess(this.message.message,'Success') 
      setTimeout(()=>{
        window.location.reload()
      },1000)  
    },err=>{
      if(err){
        this.notify.showError('Something went wrong','Error')
      }
    })  
    
  }

}
