import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private http:HttpClient) { }
  public imageData:any = []
  ngOnInit() {

    document.body.classList.add('bg-img');

    this.http.get('http://localhost:3000/api/file/viewimages').subscribe(
      res=>{
        this.imageData = res
        console.log(this.imageData)
      }
    )
  }


}
