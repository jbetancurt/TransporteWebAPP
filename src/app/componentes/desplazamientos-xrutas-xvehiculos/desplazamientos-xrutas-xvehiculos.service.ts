import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DesplazamientosXRutasXVehiculos } from './desplazamientos-xrutas-xvehiculos.model';
const urlPage = environment.apiUrl +'/desplazamientos-xrutas-xvehiculos';

@Injectable({
  providedIn: 'root'
})
export class DesplazamientosXRutasXVehiculosService {
  _DesplazamientosXRutasXVehiculos? : DesplazamientosXRutasXVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<DesplazamientosXRutasXVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<DesplazamientosXRutasXVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<DesplazamientosXRutasXVehiculos[]>{
    
    return this.httpClient.get<DesplazamientosXRutasXVehiculos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_DesplazamientosXRutasXVehiculos : DesplazamientosXRutasXVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_DesplazamientosXRutasXVehiculos.idDesplazamientoXRutaXVehiculo), _DesplazamientosXRutasXVehiculos, environment.httpOptions);
  }
  
  public create(_DesplazamientosXRutasXVehiculos : DesplazamientosXRutasXVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _DesplazamientosXRutasXVehiculos, environment.httpOptions);
  }

  public delete(idDesplazamientoXRutaXVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idDesplazamientoXRutaXVehiculo, environment.httpOptions);
  }
}

