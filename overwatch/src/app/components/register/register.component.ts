import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validate:  FormGroup;
  registerUserData = {}
  constructor( private auth: AuthService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {

    this.validate = this.fb.group({
      name:  ([null, Validators.required]),
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
  name: [
    { type: 'required', message: 'Name is required.' }
  ],
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


  
  
  registerUser(form){
    this.auth.registerUser(form.value)
    .subscribe(res=>{
      console.log(res),
      localStorage.setItem('token',res.token);
      this.router.navigate(['/fileupload']);
    },
      err => console.log(err)
    )
    console.log(form.value)

  }




  loginNavigate(){
    this.router.navigate(['/login']);
  }


}
