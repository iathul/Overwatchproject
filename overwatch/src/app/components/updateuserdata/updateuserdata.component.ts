import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service'
import { AuthService } from '../../service/auth.service'
import { NotificationService } from '../../service/utility/notification.service'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  validate:  FormGroup;
  constructor( 
              private auth: AuthService,  
              private user : UserService, 
              private notify:NotificationService,
              private fb:FormBuilder
            ) { }

  ngOnInit(): void {

    this._id = this.auth.getUserId()

    this.user.getUserData().subscribe(
      res =>{
        this.userEmail.email = res.email
      }
    )


    this.validate = this.fb.group({
      
      password: ([null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[$@$!%*?&])')
        ])]),
    })

  }  

  validateMsg = {
    
    
    password: [
      { type: 'required',  message: 'Password is required.' },
      { type: 'minlength', message: 'Must be at least 8 characters long.' },
      { type: 'pattern',  
        message: 'Must contain  one uppercase, one lowercase,one special Character, and one number.' }
    ]
    
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
