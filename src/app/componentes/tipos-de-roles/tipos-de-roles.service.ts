import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeRoles } from './tipos-de-roles.model';
const urlPage = environment.apiUrl +'/tiposderoles';

@Injectable({
  providedIn: 'root'
})
export class TiposDeRolesService {
  _TiposDeRoles? : TiposDeRoles[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeRoles>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeRoles>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeRoles[]>{
    
    return this.httpClient.get<TiposDeRoles[]>(urlPage, environment.httpOptions);
  }


  public Edit(_TiposDeRoles : TiposDeRoles): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeRoles.idTipoDeRol), _TiposDeRoles, environment.httpOptions);
  }
  
  public create(_TiposDeRoles : TiposDeRoles): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeRoles, environment.httpOptions);
  }

  
  public delete(idTipoDeRol: string): Observable<void> {
     return this.httpClient.delete<void>(urlPage + '/' + idTipoDeRol, environment.httpOptions);
  }
}



