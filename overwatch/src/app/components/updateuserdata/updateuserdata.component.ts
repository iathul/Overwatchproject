import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service'
import { AuthService } from '../../service/auth.service'
import { NotificationService } from '../../service/utility/notification.service'

@Component({
  selector: 'app-updateuserdata',
  templateUrl: './updateuserdata.component.html',
  styleUrls: ['./updateuserdata.component.css']
})
export class UpdateuserdataComponent implements OnInit {   

  _id:any
  msg:any
  errMsg:any
  userEmail:any = {
    email:""
  }
  userPassword:any ={}
  constructor( 
              private auth: AuthService,  
              private user : UserService, 
              private notify:NotificationService
            ) { }

  ngOnInit(): void {

    this._id = this.auth.getUserId()

    this.user.getUserData().subscribe(
      res =>{
        this.userEmail.email = res.email
      }
    )
  }  

  updateEmail(){
    this.user.updateEmail(this.userEmail).subscribe(
      res =>{
        this.msg = res
        this.notify.showSucess(this.msg.message,'Success') 
        setTimeout(()=>{
        window.location.reload()
      },1000) 
      },err =>{
        if(err){
          this.notify.showError('Something went wrong','Error')
        }}
    )
  }

  updatePassword(){
    this.user.updatePassword(this.userPassword).subscribe(
      res=>{
        this.msg = res
        this.notify.showSucess(this.msg.message,'Success') 
        setTimeout(()=>{
        window.location.reload()
      },1000) 
      }, err =>{
        if(err){
          this.notify.showError('Something went wrong','Error')
        }}
    )
  }

}
