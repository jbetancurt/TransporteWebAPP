import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDePuntosDeControl } from './tipos-de-puntos-de-control.model';
const urlPage = environment.apiUrl +'/tiposdepuntosdecontrol';

@Injectable({
  providedIn: 'root'
})
export class TiposDePuntosDeControlService {
  _TiposDePuntosDeControl? : TiposDePuntosDeControl[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDePuntosDeControl>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDePuntosDeControl>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDePuntosDeControl[]>{
    
    return this.httpClient.get<TiposDePuntosDeControl[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposDePuntosDeControl : TiposDePuntosDeControl): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDePuntosDeControl.idTipoDePuntoDeControl), _TiposDePuntosDeControl, environment.httpOptions);
  }
  
  public create(_TiposDePuntosDeControl : TiposDePuntosDeControl): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDePuntosDeControl, environment.httpOptions);
  }

  public delete(idTipoDePuntoDeControl: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDePuntoDeControl, environment.httpOptions);
  }
}


