import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sedes } from './sedes.model';
const urlPage = environment.apiUrl +'/sedes';

@Injectable({
  providedIn: 'root'
})
export class SedesService {
  _Sedes? : Sedes[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Sedes>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Sedes>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Sedes[]>{
    
    return this.httpClient.get<Sedes[]>(urlPage, environment.httpOptions);
  }

  public Edit(_Sedes : Sedes): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Sedes.idSede), _Sedes, environment.httpOptions);
  }
  
  public create(_Sedes : Sedes): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Sedes, environment.httpOptions);
  }

  public delete(idSede: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idSede, environment.httpOptions);
  }
 
}

