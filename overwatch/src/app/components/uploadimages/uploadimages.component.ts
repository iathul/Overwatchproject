import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'
//import { FormGroup,FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-uploadimages',
  templateUrl: './uploadimages.component.html',
  styleUrls: ['./uploadimages.component.css']
})
export class UploadimagesComponent implements OnInit {

  selectedFile = []
  public name ="" 
  public crimeNumber =""
  message:any
  constructor(private http:HttpClient, private toastr:ToastrService) { }

  ngOnInit() {

    document.body.classList.add('bg-img');

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
    this.http.post('http://localhost:3000/api/create/5ebc1838c809ec29ea9b7110',fd).subscribe(res=>{
      this.message = res
      console.log(this.message)
    })
    console.log(fd)        
  }
}









 




  

