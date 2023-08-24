import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeRequisitos } from './tipos-de-requisitos.model';
const urlPage = environment.apiUrl +'/tiposderequisitos';

@Injectable({
  providedIn: 'root'
})
export class TiposDeRequisitosService {
  _TiposDeRequisitos? : TiposDeRequisitos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeRequisitos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeRequisitos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeRequisitos[]>{
    
    return this.httpClient.get<TiposDeRequisitos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposDeRequisitos : TiposDeRequisitos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeRequisitos.idTipoDeRequisito), _TiposDeRequisitos, environment.httpOptions);
  }
  
  public create(_TiposDeRequisitos : TiposDeRequisitos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeRequisitos, environment.httpOptions);
  }

  public delete(idTipoDeRequisito: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeRequisito, environment.httpOptions);
  }
}



