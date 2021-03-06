import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSucess(msg,title){
    this.toastr.success(msg,title)
  }

  showWarning(msg,title){
    this.toastr.warning(msg,title)
  }

  showError(msg,title){
    this.toastr.error(msg,title)
  }

}
