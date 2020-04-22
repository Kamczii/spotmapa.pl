import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
declare var FB: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() checkAuthEvent = new EventEmitter();

  loginForm: FormGroup;
  failed = false;

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '353764498880760',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  login() {
    let creds = new Credentials();
    creds.username = this.loginForm.controls['nickname'].value;
    creds.password = this.loginForm.controls['password'].value;

    this.auth.login(creds).subscribe(
      resp => {
        this.auth.handleAuthentication(resp.token);
        this.checkAuthEvent.emit("emitter");
      },
      error => this.failed = true
    )

  }

  createForm() {
    this.loginForm = this.fb.group({
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  facebookLogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        this.auth.loginFacebook(response.authResponse.accessToken).subscribe(data => this.auth.handleAuthentication(data.token));
      }
      else {
        console.log('User login failed');
      }
    });

  }
}
