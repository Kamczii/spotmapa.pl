import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { PasswordValidation } from 'src/app/validators/PasswordValidation';
import { PatternValidation } from 'src/app/validators/patternValidation';
declare var FB: any;
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output() checkAuthEvent = new EventEmitter();

  registerForm: FormGroup;
  submitted = false;
  nicknameExist = false;
  emailExist = false;
  passwordTouched = false;

  constructor(private profileService: ProfileService, private auth: AuthService, private router: Router, private fb: FormBuilder) { }


  ngOnInit() {
    this.createForm();
  }

  register() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid || this.emailExist || this.nicknameExist) {
      return;
    }
    const email = this.registerForm.controls['email'].value;
    const username = this.registerForm.controls['username'].value;
    const password = this.registerForm.controls['password'].value;
    this.auth.register(email, username, password).subscribe(data => {
      let creds = new Credentials();
      creds.password = password;
      creds.username = username;
      this.auth.login(creds).subscribe(resp => {
        this.auth.handleAuthentication(resp.token);
        this.checkAuthEvent.emit("emitter");
      })
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      password: ['', [

        Validators.minLength(8),
        Validators.maxLength(20),
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        PatternValidation.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        PatternValidation.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        PatternValidation.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]],
      rpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      checkbox: ['', [Validators.required]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  facebookRegister() {
    FB.login((response) => {
      if (response.authResponse) {
        this.auth.registerFacebook(response.authResponse.accessToken).subscribe(data => {
          this.auth.loginFacebook(response.authResponse.accessToken);
        });
      }
      else {
        console.log('User login failed');
      }
    });

  }

  get f() { return this.registerForm.controls; }

  checkNickname(event) {
    this.profileService.checkNicknameExists(event.target.value).subscribe(data => this.nicknameExist = data);
  }

  checkEmail(event) {
    if (event.target.value == '')
      return false;
    return this.profileService.checkEmailExists(event.target.value).subscribe(data => this.emailExist = data);
  }


}
