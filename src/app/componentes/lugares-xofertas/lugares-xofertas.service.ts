import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LugaresXOfertas } from './lugares-xofertas.model';
const urlPage = environment.apiUrl +'/lugaresxofertas';


@Injectable({
  providedIn: 'root'
})
export class LugaresXOfertasService {
  _LugaresXOfertas? : LugaresXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<LugaresXOfertas>{ 
    let url = urlPage + "/" + id; 
    let obj =this.httpClient.get<LugaresXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<LugaresXOfertas[]>{
    
    return this.httpClient.get<LugaresXOfertas[]>(urlPage, environment.httpOptions);
  }

  public ConsultarXOferta(idOferta : string, idTipoDeLugarXOferta : string): Observable<LugaresXOfertas[]>{
    let ruta = urlPage + "/consultarxoferta/" + idOferta + "/" + idTipoDeLugarXOferta;
    return this.httpClient.get<LugaresXOfertas[]>(ruta, environment.httpOptions);
  }

  public Edit(_LugaresXOfertas : LugaresXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_LugaresXOfertas.idCiudad), _LugaresXOfertas, environment.httpOptions);
  }
  
  public create(_LugaresXOfertas : LugaresXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _LugaresXOfertas, environment.httpOptions);
  }

  public delete(idLugarXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idLugarXOferta, environment.httpOptions);
  }
  
}
  