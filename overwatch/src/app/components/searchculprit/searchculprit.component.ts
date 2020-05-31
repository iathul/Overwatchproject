import { Component, OnInit } from '@angular/core';
import { LookoutService } from '../../service/lookout/lookout.service'

@Component({
  selector: 'app-searchculprit',
  templateUrl: './searchculprit.component.html',
  styleUrls: ['./searchculprit.component.css']
})
export class SearchculpritComponent implements OnInit {
  public imageData:any = []
  searchCrimeNumber:any = {}
  searchResult:any = []
  state = false
  constructor( private lookout:LookoutService) { }

  ngOnInit() {
    this.lookout.getImages().subscribe(
      res=>{
        this.imageData = res
      }
    )  

  }

  submit(){
    this.lookout.searchCulprit(this.searchCrimeNumber).subscribe(
      res=>{
        if(res!=null){
          this.state = true
        }
        this.searchResult = res
        console.log(this.searchResult.name)
      }
    )
  }

}
