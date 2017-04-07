import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   firstname: String;
        lastname: String;
        email: String;
        username: String;
        star:String;
        password: String;
        mobile: Number;
        empid:Number;
        dob: Date;
        gender:String;
        image:String;
   user:any;
   pwd:Boolean=false;

  constructor(private validateService:ValidateService,
private _flashMessagesService: FlashMessagesService,
private authServiceService:AuthServiceService,
private router:Router) {

  this.user = {
    firstname: "",
        lastname: "",
        email: "",
        username: "",
        star:"",
        password: "",
        mobile: undefined ,
        empid:undefined ,
        dob: "",
        gender:"",
        image:"",
  }
 }

  ngOnInit() {
  }
  selectedstar(event){
    this.user.star= event.target.value;
  }


  //profile pic
fileChange($event) : void {
    this.readThis($event.target);
  }

readThis(inputValue: any): void {
  var totalLength = inputValue.files;
  for(var i = 0; i < totalLength.length; i++) {
  var file:File = inputValue.files[i];

  var myReader:FileReader = new FileReader();
  myReader.onloadend = (e) => {
    this.user.image = myReader.result;

  }
  myReader.readAsDataURL(file);
  }
}

onRegisterSubmit(user){ 

//validate all fileds
if(!this.validateService.validateRegister(user)){
  this._flashMessagesService.show("Please fill all fields", { cssClass: 'alert-danger', timeout: 3000 });

  return false;
}
//validate email
if(!this.validateService.validateEmail(user.email)){
    this._flashMessagesService.show("Please enter valid Email", { cssClass: 'alert-danger', timeout: 3000 });
  return false;
}


//validate password
if(this.validateService.validPasswords(user)){
    this._flashMessagesService.show("Password and confirmation password are not matched", { cssClass: 'alert-danger', timeout: 3000 });
  return false;
}

//register user
this.authServiceService.registerUser(user).subscribe(data=>{
if(data.success){
  this._flashMessagesService.show("Registration Successfuly Done..You can login now..", { cssClass: 'alert-success', timeout: 3000 });
this.router.navigate(['/login'])
}else{
  this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
this.router.navigate(['/register'])

}
})

}
}


