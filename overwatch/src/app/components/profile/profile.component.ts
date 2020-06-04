import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../service/utility/notification.service'
import { MatDialog } from '@angular/material'
import { environment } from '../../../environments/environment'
import { AuthService } from '../../service/auth.service'
import { UserService } from '../../service/user/user.service'
import { UpdateprofileComponent } from '../updateprofile/updateprofile.component'
import { UpdateuserdataComponent } from '../updateuserdata/updateuserdata.component'
import { Router } from '@angular/router'

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
  userLookoutData:any = [] 
  resState = false
  serverAdd =`${environment.serverAdd}`
  constructor(
            private http:HttpClient, 
            private notify:NotificationService,
            private auth: AuthService,
            public dialog: MatDialog,
            private user : UserService,
            public router : Router
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
    this.user.getUserLookoutData().subscribe(res=>{
      
     this.userLookoutData = res;
     if(this.userLookoutData && this.userLookoutData.length > 0){
        this.resState = true 
      }
    })
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

  deleteLookOutData(id){
    this.user.deleteLookoutData(id._id).subscribe(
      res=>{
        this.message = res
        this.notify.showSucess(this.message.message,'Success') 
        setTimeout(()=>{
          window.location.reload()
        },1000)  
      },err=>{
        if(err){
          this.notify.showError('Something went wrong','Error')
        }
      }
    )
  }

  updateUserData(){
    this.dialog.open(UpdateuserdataComponent);
  }

  updateLookOutData(data){
    this.router.navigate(['/updatelookoutdata',data._id])
  }

}
