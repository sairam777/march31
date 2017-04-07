import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateRegister(user){
  if(user.firstname == undefined ||user.lastname == undefined || user.username == undefined || user.email == undefined || user.password == undefined ||user.cnfpassword == undefined || user.mobile == undefined || user.empid == undefined || user.dob == undefined || user.gender == undefined ||user.star == undefined ){
      return false;
    }else{
      return true;
    }
  }

validPasswords(user){
  if(user.password ==user.cnfpassword){
    return false;
  }else
    return true;
  }


  validateEmail(email){
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
  }

}
