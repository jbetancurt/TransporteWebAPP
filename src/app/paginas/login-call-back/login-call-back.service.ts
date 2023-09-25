import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const urlPage = environment.apiUrl +'/auth/';

@Injectable({
  providedIn: 'root'
})
export class LoginCallBackService {

  constructor(private httpClient : HttpClient) { }

  public Post(code : string, state : string): Observable<any>{
    return this.httpClient.post<any>(urlPage, {"code":code, "state" : state} , environment.httpOptions);
  }
}
