import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './dumb-components/not-found/not-found.component';
import { SpotMapComponent } from './dumb-components/spot-map/spot-map.component';
import { HomeComponentComponent } from './dumb-components/home-component/home-component.component';
import { AddSpotComponent } from './dumb-components/add-spot/add-spot.component';
import { SpotComponent } from './dumb-components/spot/spot.component';
import { SpotsListComponent } from './dumb-components/spots-list/spots-list.component';
import { UpdateSpotComponent } from './dumb-components/update-spot/update-spot.component';
import { IdBasedService } from './routeGuards/id-based.service';
import { SpotContainerComponent } from './dumb-components/spot-container/spot-container.component';
import { EditSpotComponent } from './dumb-components/edit-spot/edit-spot.component';
import { ProfileInfoComponent } from './dumb-components/profile-info/profile-info.component';
import { UserEditGuardService } from './routeGuards/user-edit-guard.service';
import { EditProfileComponent } from './dumb-components/edit-profile/edit-profile.component';
import { ProfileComponentsContainerComponent } from './dumb-components/profile-components-container/profile-components-container.component';
import { LastAddedComponent } from './components/last-added/last-added.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuardService } from './routeGuards/auth-guard.service';
import { NeedLoginComponent } from './dumb-components/need-login/need-login.component';
import { PolicyComponent } from './dumb-components/policy/policy.component';


const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  {
    path: 'profile', component: ProfileComponentsContainerComponent, children: [
      { path: ':id', component: ProfileInfoComponent },
      { path: ':id/update', component: EditProfileComponent, canActivate: [UserEditGuardService] }
    ]
  }
  ,
  { path: 'list', component: LastAddedComponent },
  {
    path: 'spots', component: SpotContainerComponent, children: [
      { path: 'add-spot', component: AddSpotComponent, canActivate: [AuthGuardService]},
      { path: ':id', component: SpotComponent },
      { path: ':id/update', component: EditSpotComponent, canActivate: [IdBasedService] }

    ]
  },
  {path:'login', component: NeedLoginComponent},
  
  { path: 'password-recovery', component: ForgotPasswordComponent},
  { path: 'map', component: SpotMapComponent },
  {path:'policy',component: PolicyComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
