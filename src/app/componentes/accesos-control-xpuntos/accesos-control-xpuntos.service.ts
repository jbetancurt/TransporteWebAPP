import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccesosControlXPuntos } from './accesos-control-xpuntos.model';
const urlPage = environment.apiUrl +'/accesoscontrolxpuntos';

@Injectable({
  providedIn: 'root'
})
export class AccesosControlXPuntosService {
  _AccesosControlXPuntos? : AccesosControlXPuntos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<AccesosControlXPuntos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<AccesosControlXPuntos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<AccesosControlXPuntos[]>{
    
    return this.httpClient.get<AccesosControlXPuntos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_AccesosControlXPuntos : AccesosControlXPuntos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_AccesosControlXPuntos.idAccesoControlXPunto), _AccesosControlXPuntos, environment.httpOptions);
  }
  
  public create(_AccesosControlXPuntos : AccesosControlXPuntos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _AccesosControlXPuntos, environment.httpOptions);
  }
  public delete(idAccesoControlXPunto: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idAccesoControlXPunto, environment.httpOptions);
  }
  
}
