import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseSearchCriteria } from '../criteria/BaseSearchCrtieria';
import { Observable } from 'rxjs';
import { PageWrapper } from '../models/page';
import { Spot } from '../models/spot';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Comment} from './../models/comment';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllPosts(sc?: BaseSearchCriteria): Observable<PageWrapper<Spot>> {
    if(sc){
      let params = new HttpParams();
      params = params.append('criteria',JSON.stringify(sc));
      return this.http.get<PageWrapper<Spot>>(environment.api_endpoint+'/public/spot/all',{
      params: params
    });
    }
    else{
      return this.http.get<PageWrapper<Spot>>(environment.api_endpoint+'/public/spot/all');
    }
  }
  
  getUserById(id: number): Observable<Spot>{
    return this.http.get<Spot>(environment.api_endpoint+'/public/spot/'+id);
  }

  addPost(spot: Spot): Observable<any>{
    return this.http.post<any>(environment.api_endpoint+"/private/spot/create", spot);
  }

  addImagesToSpot(id: number, images:File[]){
    let headers = new HttpHeaders();
    headers.append("cache-control", "no-cache");
    let file = new FormData();
    for(let image of images){
      file.append('file',image);
    }
    return this.http.post(environment.api_endpoint+'/private/spot/'+id+'/images',file, {headers: headers});
  }

  likeSpotById(id: number): Observable<boolean>{
    return this.http.post<boolean>(environment.api_endpoint+'/private/spot/'+id+'/like',{});
  }

  unlikeSpotById(id: number): Observable<boolean>{
    return this.http.delete<boolean>(environment.api_endpoint+'/private/spot/'+id+'/like',{});
  }

  getSpotLikes(id: number): Observable<number>{
    return this.http.get<number>(environment.api_endpoint+'/public/spot/'+id+'/likes');
  }

  isSpotLiked(id: number): Observable<boolean>{
    if(!this.auth.isAuthenticated())
      return;
    return this.http.get<boolean>(environment.api_endpoint+'/private/spot/'+id+'/like');
  }

  addCommentBySpotId(id: number, comment: Comment){
    return this.http.post(environment.api_endpoint+'/private/spot/'+id+'/comments', comment);
  }

  getCommentsBySpotId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.api_endpoint+'/public/spot/'+id+'/comments');
  }
}
