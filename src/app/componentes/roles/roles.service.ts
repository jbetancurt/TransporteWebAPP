import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles } from './roles.model';
const urlPage = environment.apiUrl +'/roles';

@Injectable({
  providedIn: 'root'
})
export default class RolesService {
  _Roles? : Roles[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Roles>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Roles>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Roles : Roles): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Roles.idRol), _Roles, environment.httpOptions);
  }
  
  public create(_Roles : Roles): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Roles, environment.httpOptions);
  }

  public delete(idRol: string){
     this.httpClient.delete(urlPage + '/' + idRol, environment.httpOptions);
 }
}

