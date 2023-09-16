import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DestinosXRutasXVehiculos } from './destinos-xrutas-xvehiculos.model';
const urlPage = environment.apiUrl +'/destinosxrutasxvehiculos';

@Injectable({
  providedIn: 'root'
})
export class DestinosXRutasXVehiculosService {
  _DestinosXRutasXVehiculos? : DestinosXRutasXVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<DestinosXRutasXVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<DestinosXRutasXVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<DestinosXRutasXVehiculos[]>{
    
    return this.httpClient.get<DestinosXRutasXVehiculos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_DestinosXRutasXVehiculos : DestinosXRutasXVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_DestinosXRutasXVehiculos.idDestinoXRutaXVehiculo), _DestinosXRutasXVehiculos, environment.httpOptions);
  }
  
  public create(_DestinosXRutasXVehiculos : DestinosXRutasXVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _DestinosXRutasXVehiculos, environment.httpOptions);
  }

  public delete(idDestinoXRutaXVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idDestinoXRutaXVehiculo, environment.httpOptions);
  }

  
}
