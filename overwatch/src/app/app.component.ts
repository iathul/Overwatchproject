import { Component } from '@angular/core';
import { AuthService } from "./service/auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'overwatch';

  constructor(private auth: AuthService){}
  
  ngOnInit() {
    //document.body.classList.add('bg-img');
}

}
