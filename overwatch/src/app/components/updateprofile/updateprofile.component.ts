import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor() { }

  public name ="" 
  public email ="" 
  public password =""
  public designation =""
  public mobileno =""
  public station =""
  public district =""
  public state ="" 
  public selectedFile = null

  ngOnInit(): void {
  }

  onFileChange(event){
    this.selectedFile = event.target.file[0];
  }

  updateProfile(){
    const fd = new FormData();
    fd.append('name',this.name)
    fd.append('email',this.email)
    fd.append('password',this.password)
    fd.append('designation',this.designation)
    fd.append('mobile',this.mobileno)
    fd.append('station',this.station)
    fd.append('district',this.district)
    fd.append('state',this.state)
    fd.append('profile-pic',this.selectedFile)
}

}
