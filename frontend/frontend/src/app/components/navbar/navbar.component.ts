import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { RegisterFormComponent } from 'src/app/dumb-components/register-form/register-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profile: User;

  constructor(public auth: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication(){
    if(this.auth.isAuthenticated()){
      this.profileService.getCurrentUserProfile().subscribe(data => this.profile = data)
    }
  }
}
