import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Destinos } from './destinos.model';
const urlPage = environment.apiUrl +'/destinos';

@Injectable({
  providedIn: 'root'
})
export default class DestinosService {
  _Destinos? : Destinos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Destinos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Destinos>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Destinos : Destinos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Destinos.idCiudad), _Destinos, environment.httpOptions);
  }
  
  public create(_Destinos : Destinos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Destinos, environment.httpOptions);
  }

  public delete(idDestino: string){
     this.httpClient.delete(urlPage + '/' + idDestino, environment.httpOptions);
 }
}
  
