import { ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GenericResponse } from '../models/genericresponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userProfile: User;


  constructor(private http: HttpClient, private auth: AuthService) { }

  getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(environment.api_endpoint + '/current-user');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.api_endpoint + '/public/user?id=' + id);
  }

  checkNicknameExists(nickname: String): Observable<boolean> {
    return this.http.get<boolean>(environment.api_endpoint + '/public/user/nickname?nickname=' + nickname)
  }

  checkEmailExists(email: String): Observable<boolean> {
    return this.http.get<boolean>(environment.api_endpoint + '/public/user/email?email=' + email)
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(environment.api_endpoint + "/private/user/update", user);
  }

  changePassword(id: string, token: string, newPassword: string): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(environment.api_endpoint + "/user/changePassword?id="+id+"&token="+token,{"newPassword":newPassword});
  }
  checkIfUserContent(path_id: number) {

    console.log(path_id + ' ' + this.auth.getUserId())
    if (this.auth.isAuthenticated()) {
      if (path_id == this.auth.getUserId())
        return true;
      else
        return false;
    }
  }

  uploadAvatar(data: File) {
    let headers = new HttpHeaders();
    headers.append("cache-control", "no-cache");
    let file = new FormData();
    file.append('file', data);
    return this.http.post<any>(environment.api_endpoint + '/private/image/avatar', file, { headers: headers });
  }

  deleteAvatar() {
    return this.http.delete<any>(environment.api_endpoint + '/private/image/avatar');
  }
}
