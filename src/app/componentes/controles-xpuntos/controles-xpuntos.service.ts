import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ControlesXPuntos } from './controles-xpuntos.model';
const urlPage = environment.apiUrl +'/controlesxpuntos';

@Injectable({
  providedIn: 'root'
})
export class ControlesXPuntosService {
  _ControlesXPuntos? : ControlesXPuntos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<ControlesXPuntos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<ControlesXPuntos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<ControlesXPuntos[]>{
    
    return this.httpClient.get<ControlesXPuntos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_ControlesXPuntos : ControlesXPuntos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_ControlesXPuntos.idControlXPunto), _ControlesXPuntos, environment.httpOptions);
  }
  
  public create(_ControlesXPuntos : ControlesXPuntos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _ControlesXPuntos, environment.httpOptions);
  }

  public delete(idControlXPunto: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idControlXPunto, environment.httpOptions);
  }
  
}

