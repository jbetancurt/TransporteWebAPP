import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargasXOfertas } from './cargas-xofertas.model';
const urlPage = environment.apiUrl +'/cargasxofertas';


 
@Injectable({
  providedIn: 'root'
})
export  class CargasXOfertasService {
  _CargasXOfertas? : CargasXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<CargasXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<CargasXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public ConsultarXOferta(idOferta : string): Observable<CargasXOfertas[]>{
    let ruta = urlPage + "/consultarxoferta/" + idOferta;
    return this.httpClient.get<CargasXOfertas[]>(ruta, environment.httpOptions);
  }

  public GetAll(): Observable<CargasXOfertas[]>{
    
    return this.httpClient.get<CargasXOfertas[]>(urlPage, environment.httpOptions);
  }

  
  public Edit(_CargasXOfertas : CargasXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_CargasXOfertas.idCargaXOferta), _CargasXOfertas, environment.httpOptions);
  }
  
  public create(_CargasXOfertas : CargasXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _CargasXOfertas, environment.httpOptions);
  }

  public delete(idCarroceriaXTipoDeVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idCarroceriaXTipoDeVehiculo, environment.httpOptions);
  }

  public BorrarPorIdOferta(idOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/borrarporidoferta/' + idOferta, environment.httpOptions);
  }
}

