import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service'
import { NotificationService } from '../../service/utility/notification.service'

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  
  msg:any
  errMsg:any
  addUserData:any = {
    state:"Kerala",
    country:"India"
  }

  constructor( private notify:NotificationService,
               private user: UserService
             ) { }

 
  ngOnInit(): void {}

  updateProfile(){
    this.user.addUserData(this.addUserData)
    .subscribe(res=>{
      this.msg = res.message
      this.notify.showSucess(this.msg,'Sucess')
      setTimeout(()=>{
        window.location.reload()
      },1000)
    },
      error => {
        if(error){
          this.errMsg = error.error.error   
          this.notify.showError(this.errMsg,"Error")

        }
      }
    )
  } 
}
