import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeNotificaciones } from './tipos-de-notificaciones.model';
const urlPage = environment.apiUrl +'/tiposdenotificaciones';




@Injectable({
  providedIn: 'root'
})
export class TiposDeNotificacionesService {
  _TiposDeNotificaciones? : TiposDeNotificaciones[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeNotificaciones>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeNotificaciones>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeNotificaciones[]>{
    
    return this.httpClient.get<TiposDeNotificaciones[]>(urlPage, environment.httpOptions);
  }


  public Edit(_TiposDeNotificaciones : TiposDeNotificaciones): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeNotificaciones.idTipoDeNotificacion), _TiposDeNotificaciones, environment.httpOptions);
  }
  
  public create(_TiposDeNotificaciones : TiposDeNotificaciones): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeNotificaciones, environment.httpOptions);
  }

  public delete(idTipoDeNotificacion: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeNotificacion, environment.httpOptions);
  }
}

