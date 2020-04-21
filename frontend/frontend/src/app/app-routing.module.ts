import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './dumb-components/not-found/not-found.component';
import { SpotMapComponent } from './dumb-components/spot-map/spot-map.component';
import { HomeComponentComponent } from './dumb-components/home-component/home-component.component';
import { AddSpotComponent } from './dumb-components/add-spot/add-spot.component';
import { SpotComponent } from './dumb-components/spot/spot.component';
import { LastAddedComponent } from './dumb-components/last-added/last-added.component';
import { UpdateSpotComponent } from './dumb-components/update-spot/update-spot.component';
import { IdBasedService } from './routeGuards/id-based.service';
import { SpotContainerComponent } from './dumb-components/spot-container/spot-container.component';
import { EditSpotComponent } from './dumb-components/edit-spot/edit-spot.component';
import { ProfileInfoComponent } from './dumb-components/profile-info/profile-info.component';
import { UserEditGuardService } from './routeGuards/user-edit-guard.service';
import { EditProfileComponent } from './dumb-components/edit-profile/edit-profile.component';
import { ProfileComponentsContainerComponent } from './dumb-components/profile-components-container/profile-components-container.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponentComponent },
  { path: 'profile', component: ProfileComponentsContainerComponent, children:[
    { path: ':id', component: ProfileInfoComponent },
    { path: ':id/update', component: EditProfileComponent, canActivate: [UserEditGuardService] }
  ]}
  ,
  { path: 'last', component: LastAddedComponent },
  {
    path: 'spots', component: SpotContainerComponent, children: [
      { path: 'add-spot', component: AddSpotComponent },
      { path: ':id', component: SpotComponent },
      { path: ':id/update', component: EditSpotComponent, canActivate: [IdBasedService] }

    ]
  },
  { path: 'map', component: SpotMapComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
