import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menus } from './menus.model';
const urlPage = environment.apiUrl +'/menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  _Menus? : Menus[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Menus>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Menus>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Menus[]>{
    
    return this.httpClient.get<Menus[]>(urlPage, environment.httpOptions);
  }

  public Edit(_Menus : Menus): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Menus.idMenu), _Menus, environment.httpOptions);
  }
  
  public create(_Menus : Menus): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Menus, environment.httpOptions);
  }

  public delete(idMenu: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idMenu, environment.httpOptions);
  }
  
}


