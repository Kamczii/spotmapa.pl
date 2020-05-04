import { Credentials } from './../models/credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';
import { JwtTokenResponse } from '../models/JwtTokenResponse';
import * as jwt_decode from 'jwt-decode';
import { GenericResponse } from '../models/genericresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile: any;

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) {
  }


  public login(creds: Credentials): Observable<JwtTokenResponse> {
    return this.http.post<JwtTokenResponse>(environment.api_endpoint + '/authenticate', creds);
  }


  public loginFacebook(token: string) {
    return this.http.post<JwtTokenResponse>(environment.api_endpoint + '/authenticate/facebook', token);
  }


  public registerFacebook(accessToken: any) {
    return this.http.post<JwtTokenResponse>(environment.api_endpoint + '/public/users/sign-up/facebook', accessToken);
  }

  public register(email: String, username: String, password: String): Observable<User> {
    return this.http.post<User>(environment.api_endpoint + '/public/users/sign-up', { email, username, password });
  }

  public requestPasswordReset(email: String): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(environment.api_endpoint + "/public/user/resetPassword?email="+email,{});
  }

  public handleAuthentication(token: String) {
    localStorage.setItem('access_token', token.toString());
    this.getUserId();
  }

  public logout(): void {
    localStorage.removeItem('access_token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public refreshAccessToken() {
    console.log('refreshing token')
    return this.http.get<any>(environment.api_endpoint + '/refresh-token');
  }


  getUserId() {
    if (this.isAuthenticated()) {
      let header = localStorage.getItem('access_token');
      const token = header.replace('Bearer', '');
      const data = this.getDecodedAccessToken(token);
      return data.id;
    } else
      return null;
  }

  getDecodedAccessToken(token: string): any {

    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = this.getDecodedAccessToken(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = localStorage.getItem('access_token');
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }


}
