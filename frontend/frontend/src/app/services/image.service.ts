import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  
  uploadImages(data: File[]){
    let headers = new HttpHeaders();
    headers.append("cache-control", "no-cache");
    let file = new FormData();
    let i=1;
    for(let img in data){
      file.append('file'+i,img);
      i++;
    }
    return this.http.post<any>(environment.api_endpoint+'/private/image/avatar',file,{headers: headers});
  }

}
