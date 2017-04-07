import { AuthGuard } from './guards/auth.guard';
import {Routes,RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ModuleWithProviders} from '@angular/core';
import { AboutusComponent } from './components/aboutus/aboutus.component';
const appRoutes: Routes=[

  {
    path:'',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
   {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
      canActivate:[AuthGuard]
  },
  {
    path:'aboutus',
    component:AboutusComponent,
    canActivate:[AuthGuard]
  },

]
export const routing :ModuleWithProviders =RouterModule.forRoot(appRoutes);
