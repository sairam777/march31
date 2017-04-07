import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;

  constructor(private _flashMessagesService: FlashMessagesService,
  private authServiceService:AuthServiceService,
  private router:Router) { }

  ngOnInit() {
    this.authServiceService.allStars().subscribe(res=>{
      this.user= res["data"];


    },
    err=>{
      console.log(err);
      return false;
    });

  }

}
