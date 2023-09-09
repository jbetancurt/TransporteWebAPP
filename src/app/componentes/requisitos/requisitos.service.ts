import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Requisitos } from './requisitos.model';
const urlPage = environment.apiUrl +'/requisitos';

@Injectable({
  providedIn: 'root'
})
export  class RequisitosService {
  _Requisitos? : Requisitos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Requisitos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Requisitos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Requisitos[]>{
    
    return this.httpClient.get<Requisitos[]>(urlPage, environment.httpOptions);
  }


  public Edit(_Requisitos : Requisitos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Requisitos.idRequisito), _Requisitos, environment.httpOptions);
  }
  
  public create(_Requisitos : Requisitos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Requisitos, environment.httpOptions);
  }

  public delete(idRequisito: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idRequisito, environment.httpOptions);
  }

}


