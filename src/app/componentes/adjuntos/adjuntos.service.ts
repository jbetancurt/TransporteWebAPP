import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adjuntos } from './adjuntos.model';
const urlPage = environment.apiUrl +'/adjuntos';

@Injectable({
  providedIn: 'root'
})
export default class AdjuntosService {
  _Adjuntos? : Adjuntos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Adjuntos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Adjuntos>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Adjuntos : Adjuntos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Adjuntos.idAdjunto), _Adjuntos, environment.httpOptions);
  }
  
  public create(_Adjuntos : Adjuntos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Adjuntos, environment.httpOptions);
  }

  public delete(idAdjunto : string){
     this.httpClient.delete(urlPage + '/' + idAdjunto, environment.httpOptions);
 }
}

