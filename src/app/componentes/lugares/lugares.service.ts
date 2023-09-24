import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lugares } from './lugares.model';
const urlPage = environment.apiUrl +'/lugares';


@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  _Lugares? : Lugares[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Lugares>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Lugares>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Lugares[]>{
    
    return this.httpClient.get<Lugares[]>(urlPage, environment.httpOptions);
  }

  public Edit(_Lugares : Lugares): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Lugares.idCiudad), _Lugares, environment.httpOptions);
  }
  
  public create(_Lugares : Lugares): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Lugares, environment.httpOptions);
  }

  public delete(idLugar: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idLugar, environment.httpOptions);
  }
  
}
  
