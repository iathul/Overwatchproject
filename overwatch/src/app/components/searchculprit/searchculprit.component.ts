import { Component, OnInit } from '@angular/core';
import { LookoutService } from '../../service/lookout/lookout.service'

@Component({
  selector: 'app-searchculprit',
  templateUrl: './searchculprit.component.html',
  styleUrls: ['./searchculprit.component.css']
})
export class SearchculpritComponent implements OnInit {
  public imageData:any = []
  constructor( private lookout:LookoutService) { }

  ngOnInit() {
    this.lookout.getImages().subscribe(
      res=>{
        this.imageData = res
        console.log(this.imageData)
      }
    )  

  }

}
