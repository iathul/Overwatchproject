import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LookoutService } from '../../service/lookout/lookout.service'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(
                private http:HttpClient,
                private lookout:LookoutService
                ) { }
  public imageData:any = []
  ngOnInit() {

    this.lookout.getImages().subscribe(
      res=>{
        this.imageData = res
        console.log(this.imageData)
      }
    )
  }


}
