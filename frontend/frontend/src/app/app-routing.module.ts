import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './dumb-components/not-found/not-found.component';
import { SpotMapComponent } from './dumb-components/spot-map/spot-map.component';
import { HomeComponentComponent } from './dumb-components/home-component/home-component.component';
import { AddSpotComponent } from './dumb-components/add-spot/add-spot.component';
import { SpotComponent } from './dumb-components/spot/spot.component';
import { LastAddedComponent } from './dumb-components/last-added/last-added.component';


const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'spots', children: [
    {path: 'map', component: SpotMapComponent},
    {path: 'add-spot', component: AddSpotComponent},
    {path: 'last', component:LastAddedComponent},
    {path: ':id',component: SpotComponent}
  ]},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
