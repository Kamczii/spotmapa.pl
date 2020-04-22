import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatternValidation } from 'src/app/validators/patternValidation';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  nicknameExist = false;
  emailExist = false;
  profile: User;

  constructor(private auth: AuthService, private fb: FormBuilder, private profileService: ProfileService, private router: Router) { }

  ngOnInit() {

    this.createForm();
    this.profileService.getCurrentUserProfile().subscribe(data => {
      this.profile = data;

      this.profileForm.controls['email'].setValue(this.profile.email);
      this.profileForm.controls['description'].setValue(this.profile.description);
      //this.profileForm.controls['username'].setValue(this.profile.username);
    });
  }

  register() {

    // stop here if form is invalid
    if (this.profileForm.invalid || this.emailExist || this.nicknameExist) {
      return;
    }
    const email = this.profileForm.controls['email'].value;
    const description = this.profileForm.controls['description'].value;
    //const username = this.profileForm.controls['username'].value;

    this.profile.email = email;
    this.profile.description = description;
    //this.profile.username = username;

    this.profileService.updateProfile(this.profile).subscribe(data => {
      this.auth.refreshAccessToken();
      this.router.navigate(['/profile/' + this.profile.id]);
    });
  }

  createForm() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.maxLength(400)]],
      //username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    });
  }

  checkNickname(event) {
    this.profileService.checkNicknameExists(event.target.value).subscribe(data => this.nicknameExist = data);
  }

  checkEmail(event) {
    if (event.target.value == '')
      return false;
    return this.profileService.checkEmailExists(event.target.value).subscribe(data => this.emailExist = data);
  }
}
