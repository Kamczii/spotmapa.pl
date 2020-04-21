import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { SpotService } from 'src/app/services/spot.service';
import { Spot } from 'src/app/models/spot';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  user: User;
  spots: Spot[] = [];
  spotsCount: number;

  isUserOwningProfile: boolean = false;

  constructor(private authService: AuthService, private profileService: ProfileService, private route: ActivatedRoute, private spotService: SpotService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id == this.authService.getUserId())
        this.isUserOwningProfile = true;
      this.profileService.getUserById(id).subscribe(data => this.user = data);
      this.spotService.getSpotsByUserId(id).subscribe(data => {this.spots = data.results; this.spotsCount = data.rows;});
    });

  }

}
