import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresas } from './empresas.model';
const urlPage = environment.apiUrl +'/empresas';

@Injectable({
  providedIn: 'root'
})
export default class EmpresasService {
  _Empresas? : Empresas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Empresas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Empresas>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Empresas : Empresas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Empresas.idEmpresa), _Empresas, environment.httpOptions);
  }
  
  public create(_Empresas : Empresas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Empresas, environment.httpOptions);
  }

  public delete(idEmpresa: string){
     this.httpClient.delete(urlPage + '/' + idEmpresa, environment.httpOptions);
 }
}

