import { Injectable } from '@angular/core';
import {Headers,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthServiceService {
  authToken:any;
  user:any;

  constructor(private http:Http) { }
   validateLogin(user){
    if(user.username == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

registerUser(user){

  var headers=new Headers();
headers.append('Content-Type','application/json');
return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).map(res=>res.json());
}

getprofile(){
var headers=new Headers();
this.loadToken();
headers.append('Authorization',this.authToken);
headers.append('Content-Type','application/json');
return this.http.get('users/profile',{headers:headers}).map(res=>res.json());

}
authUser(user){
  var headers=new Headers();
headers.append('Content-Type','application/json');
return this.http.post('users/authenticate',user,{headers:headers}).map(res=>res.json());
}

allStars(){
  var headers=new Headers();
headers.append('Content-Type','application/json');
return this.http.get('users/allstars',{headers:headers}).map(res=>res.json());
}


storeUserData(token,user){
localStorage.setItem('id_token',token);
localStorage.setItem('user',JSON.stringify(user));
this.authToken=token;
this.user=user;
}

loadToken(){
const token = localStorage.getItem('id_token');
this.authToken=token;
}

loggedIn() {
  return tokenNotExpired();
}

logout(){
  this.authToken=null;
  this.user=null;
  localStorage.clear();
}
}
