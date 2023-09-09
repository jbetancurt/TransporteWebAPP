import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolXUsuarios } from './rol-xusuarios.model';
const urlPage = environment.apiUrl +'/rolxusuarios';

@Injectable({
  providedIn: 'root'
})
export class RolXUsuariosService {
  _RolXUsuarios? : RolXUsuarios[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RolXUsuarios>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RolXUsuarios>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<RolXUsuarios[]>{
    
    return this.httpClient.get<RolXUsuarios[]>(urlPage, environment.httpOptions);
  }

  public Edit(_RolXUsuarios : RolXUsuarios): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RolXUsuarios.idRolXUsuario), _RolXUsuarios, environment.httpOptions);
  }
  
  public create(_RolXUsuarios : RolXUsuarios): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RolXUsuarios, environment.httpOptions);
  }

  public delete(idRolXUsuario: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idRolXUsuario, environment.httpOptions);
  }

  
}

