import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDePersonasPorVehiculos } from './tipos-de-personas-por-vehiculos.model';
const urlPage = environment.apiUrl +'/tiposdepersonasporvehiculos';

@Injectable({
  providedIn: 'root'
})
export class TiposDePersonasPorVehiculosService {
  _TiposDePersonasPorVehiculos? : TiposDePersonasPorVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDePersonasPorVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDePersonasPorVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDePersonasPorVehiculos[]>{
    
    return this.httpClient.get<TiposDePersonasPorVehiculos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposDePersonasPorVehiculos : TiposDePersonasPorVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDePersonasPorVehiculos.idTipoDePersonaPorVehiculo), _TiposDePersonasPorVehiculos, environment.httpOptions);
  }
  
  public create(_TiposDePersonasPorVehiculos : TiposDePersonasPorVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDePersonasPorVehiculos, environment.httpOptions);
  }
  
  public delete(idTipoDePersonaPorVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDePersonaPorVehiculo, environment.httpOptions);
  }
}



