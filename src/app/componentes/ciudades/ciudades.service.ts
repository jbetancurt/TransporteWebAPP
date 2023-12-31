import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ciudades } from './ciudades.model';
const urlPage = environment.apiUrl +'/ciudades';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  _Ciudades? : Ciudades[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Ciudades>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Ciudades>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Ciudades[]>{
    
    return this.httpClient.get<Ciudades[]>(urlPage, environment.httpOptions);
  }

  public Edit(_Ciudades : Ciudades): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Ciudades.idCiudad), _Ciudades, environment.httpOptions);
  }
  
  public create(_Ciudades : Ciudades): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Ciudades, environment.httpOptions);
  }

  public delete(idCiudad: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idCiudad, environment.httpOptions);
  }
  
}

