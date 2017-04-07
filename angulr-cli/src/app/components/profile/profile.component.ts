import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:object;

  constructor(private _flashMessagesService: FlashMessagesService,
  private authServiceService:AuthServiceService,
  private router:Router) { }

  ngOnInit() {
    this.authServiceService.getprofile().subscribe(profile=>{
      this.user=profile.user;
       console.log(this.user);
        },

    err =>{
      console.log(err);
      return false;
    });

  }

}
