import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolXUsuarios } from './rol-xusuarios.model';
const urlPage = environment.apiUrl +'/rol-xusuarios';

@Injectable({
  providedIn: 'root'
})
export default class RolXUsuariosService {
  _RolXUsuarios? : RolXUsuarios[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RolXUsuarios>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RolXUsuarios>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_RolXUsuarios : RolXUsuarios): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RolXUsuarios.idRolXUsuario), _RolXUsuarios, environment.httpOptions);
  }
  
  public create(_RolXUsuarios : RolXUsuarios): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RolXUsuarios, environment.httpOptions);
  }

  public delete(idRolXUsuario: string){
     this.httpClient.delete(urlPage + '/' + idRolXUsuario, environment.httpOptions);
 }
}

