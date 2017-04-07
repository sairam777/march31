import { AuthServiceService } from './../services/auth-service.service';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(private authServiceService:AuthServiceService,
 private router:Router){

  }
  canActivate(){
    if(this.authServiceService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false
    }
  }
}

