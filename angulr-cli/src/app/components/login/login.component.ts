import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username:String;
  password:String;

data:any;

  constructor(private _flashMessagesService: FlashMessagesService,
  private authServiceService:AuthServiceService,
  private router:Router) { }

  ngOnInit() {
    this.data = {name:'',password:""};
      if(localStorage.getItem("user") != null && localStorage.getItem("user") !=''){
        this.router.navigate(['dashboard']);
      }else{
          this.data = {name:'',password:""};
      }
  }
onLoginSubmit(){
  const user = {
   username:this.username,
  password:this.password

}
if(!this.authServiceService.validateLogin(user)){
  console.log(user);
    this._flashMessagesService.show("Please fill username and Password..", { cssClass: 'alert-danger', timeout: 3000 });

}
else{
  this.authServiceService.authUser(user).subscribe(data=>{
console.log(data);
if(data.success){
    console.log(user);
  this.authServiceService.storeUserData(data.token,data.user);
  this._flashMessagesService.show("Login Successfully..", { cssClass: 'alert-success', timeout: 1000 });
this.router.navigate(['/profile'])
}else{

  this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
this.router.navigate(['/login'])

}
})

}

}

}
