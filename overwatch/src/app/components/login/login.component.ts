import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../service/auth.service'
import { NotificationService } from '../../service/utility/notification.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validate:  FormGroup;
  id:any
  errMsg:any

  constructor(private auth: AuthService,
              private router:Router,
              private fb:FormBuilder,
              private notify:NotificationService) { }

  ngOnInit() {

    this.validate = this.fb.group({
      email: ([null, Validators.compose([
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
       ])]),
      password: ([null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[$@$!%*?&])')
        ])]),
    })

  }

  validateMsg = {
    
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern',  message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required',  message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'pattern',  
        message: 'Password must contain at least one uppercase, one lowercase,one special Character, and one number.' }
    ]
    
  }
   
  

  loginUser(form){
    return this.auth.loginUser(form.value).subscribe( 
      res => {
        localStorage.setItem('token',res.token);
        localStorage.setItem('userId',res.user._id)
        localStorage.setItem('userName',res.user.name)
        this.router.navigate(['/createlookoutdata'],); 
        this.notify.showSucess('Login Sucessfull','Sucess')
        setTimeout(()=>{
          window.location.reload()
        },500)
      },
      
      error => {
        if(error){
          this.errMsg = error.error.error
          this.notify.showError( this.errMsg,'Error')
        }
      },
      
    );
    
  }

  signupNavigate(){
    this.router.navigate(["/register"]);
  }

}
