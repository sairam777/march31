import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private _flashMessagesService: FlashMessagesService,
  private authServiceService:AuthServiceService,
  private router:Router) { }

  ngOnInit() {
  }

onLogoutClick(){
  this.authServiceService.logout();
  this._flashMessagesService.show("You are Logged out", { cssClass: 'alert-success', timeout: 2000 });
  this.router.navigate(['/login']);
  return false;
}
}
