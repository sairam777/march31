
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ModuleWithProviders} from '@angular/core';
import {routing} from './app.routing';
import {ValidateService} from './services/validate.service';
import {AuthServiceService} from './services/auth-service.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { AuthGuard } from './guards/auth.guard';
import { AboutusComponent } from './components/aboutus/aboutus.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    FlashMessagesModule,
    routing,



  ],
  providers: [ValidateService,AuthServiceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
