import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { NotificationService } from '../../service/utility/notification.service'
import { MatDialog } from '@angular/material'
import {UpdateprofileComponent} from '../updateprofile/updateprofile.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _id:any
  constructor(
            private http:HttpClient, 
            private notify:NotificationService,
            private route:ActivatedRoute,
            private router:Router,
            public dialog: MatDialog
  ) { }

  ngOnInit() {}

  updateProfile(){
    this.dialog.open(UpdateprofileComponent);
  }

}
