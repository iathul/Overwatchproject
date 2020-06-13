import { Component, OnInit } from '@angular/core';
import { LookoutService } from '../../service/lookout/lookout.service'
import { NotificationService } from '../../service/utility/notification.service'
import { HttpClient } from '@angular/common/http'


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
  resState = false
  errMsg:any
  response:any =[]
  path:any = {
    front:"",
    right:"",
    left:""
  }

  constructor(  private lookout:LookoutService,
                private notify:NotificationService,
                private http: HttpClient
             ) { }

  ngOnInit() {
    this.lookout.getImages().subscribe(
      res=>{
        this.imageData = res
        if(this.imageData && this.imageData.length > 0){
          this.resState = true
          console.log(this.resState)
        }
      }
    )  

  }

  submit(){
    this.lookout.searchCulprit(this.searchCrimeNumber).subscribe(
      res=>{
        if(res!=null){
          this.state = true
          console.log(this.state);
        }
        this.searchResult = res
      },
      err=>{
        this.errMsg = err
        this.notify.showError(this.errMsg.error.error,'Error')
      }
    )
  }

   find(id){
    this.lookout.find(id._id).subscribe(
     async res=>{
       
        this.response = res
        this.path.front = await this.response.images.front.path
        this.path.right = await this.response.images.right.path
        this.path.left  = await this.response.images.left.path
        //console.log(this.path)
        this.lookout.findOnCamera(this.path).subscribe(res=>{
          this.notify.showSucess('Searching on CCTV','Please Wait')
          //console.log(res)

          setTimeout(()=>{
            return this.http.get<any>('http://localhost:5000/getResponse').subscribe(
            async res =>{
               await console.log(res)
            }
          )
          },5000)

          
          
        })
      }
    )
    
  }

}
