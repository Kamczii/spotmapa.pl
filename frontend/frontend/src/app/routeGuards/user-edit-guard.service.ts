import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SpotService } from '../services/spot.service';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router, public profileService: ProfileService, public authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedId = route.params['id'];
    
    const id = this.authService.getUserId();
    if (
      !this.auth.isAuthenticated() ||
      id != expectedId
    ) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
