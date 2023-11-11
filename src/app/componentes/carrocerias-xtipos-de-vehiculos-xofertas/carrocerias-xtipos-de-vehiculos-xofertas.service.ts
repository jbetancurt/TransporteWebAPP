import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarroceriasXTiposDeVehiculosXOfertas } from './carrocerias-xtipos-de-vehiculos-xofertas.model';
const urlPage = environment.apiUrl +'/carroceriasxtiposdevehiculosxofertas';



 
@Injectable({
  providedIn: 'root'
})
export  class CarroceriasXTiposDeVehiculosXOfertasService {
  _CarroceriasXTiposDeVehiculosXOfertas? : CarroceriasXTiposDeVehiculosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<CarroceriasXTiposDeVehiculosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<CarroceriasXTiposDeVehiculosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public ConsultarXOferta(idOferta : string): Observable<CarroceriasXTiposDeVehiculosXOfertas[]>{
    let ruta = urlPage + "/consultarxoferta/" + idOferta;
    return this.httpClient.get<CarroceriasXTiposDeVehiculosXOfertas[]>(ruta, environment.httpOptions);
  }

  public GetAll(): Observable<CarroceriasXTiposDeVehiculosXOfertas[]>{
    
    return this.httpClient.get<CarroceriasXTiposDeVehiculosXOfertas[]>(urlPage, environment.httpOptions);
  }

  
  public Edit(_CarroceriasXTiposDeVehiculosXOfertas : CarroceriasXTiposDeVehiculosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_CarroceriasXTiposDeVehiculosXOfertas.idCarroceriaXTipoDeVehiculoXOferta), _CarroceriasXTiposDeVehiculosXOfertas, environment.httpOptions);
  }
  
  public create(_CarroceriasXTiposDeVehiculosXOfertas : CarroceriasXTiposDeVehiculosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _CarroceriasXTiposDeVehiculosXOfertas, environment.httpOptions);
  }

  public delete(idCarroceriaXTipoDeVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idCarroceriaXTipoDeVehiculo, environment.httpOptions);
  }

  public BorrarPorIdOferta(idOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/borrarporidoferta/' + idOferta, environment.httpOptions);
  }
}

