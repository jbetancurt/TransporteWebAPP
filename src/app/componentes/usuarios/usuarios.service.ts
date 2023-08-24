import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from './usuarios.model';
const urlPage = environment.apiUrl +'/usuarios';

@Injectable({
  providedIn: 'root'
})
export default class UsuariosService {
  _Usuarios? : Usuarios[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Usuarios>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Usuarios>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Usuarios : Usuarios): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Usuarios.idUsuario), _Usuarios, environment.httpOptions);
  }
  
  public create(_Usuarios : Usuarios): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Usuarios, environment.httpOptions);
  }

  public delete(idUsuario: string){
     this.httpClient.delete(urlPage + '/' + idUsuario, environment.httpOptions);
 }
}
