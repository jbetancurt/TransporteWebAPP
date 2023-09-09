import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paises } from './paises.model';
const urlPage = environment.apiUrl +'/paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  _Paises? : Paises[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Paises>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Paises>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Paises[]>{
    
    return this.httpClient.get<Paises[]>(urlPage, environment.httpOptions);
  }


  public Edit(_Paises : Paises): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Paises.idPais), _Paises, environment.httpOptions);
  }
  
  public create(_Paises : Paises): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Paises, environment.httpOptions);
  }

  public delete(idPais: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idPais, environment.httpOptions);
  }
}

