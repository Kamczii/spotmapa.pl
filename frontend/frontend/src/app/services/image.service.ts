import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadAvatar(data: File): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("cache-control", "no-cache");
    let file = new FormData();
    file.append('file', data);
    return this.http.post(environment.api_endpoint + '/private/image/avatar', file, { headers: headers });
  }

}
