import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../service/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validate:  FormGroup;
  

  constructor(private auth: AuthService,private router:Router,private fb:FormBuilder) { }

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
    this.auth.loginUser(form.value)
     .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token);
        this.router.navigate(['/fileupload']); 
      },
      err => console.log(err)
    )
    console.log(form.value)
  
  }

  signupNavigate(){
    this.router.navigate(["/register"]);
  }

}
