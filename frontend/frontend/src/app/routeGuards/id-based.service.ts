import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class IdBasedService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public spotService: SpotService, public authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const spotId = route.params['id'];
    this.spotService.getSpotById(spotId).subscribe(data => {
      const spot = data;
      const expectedId = spot.user.id;
      const id = this.authService.getUserId();
      if (
        !this.auth.isAuthenticated() ||
        id !== expectedId
      ) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    });

    return true;
  }
}
