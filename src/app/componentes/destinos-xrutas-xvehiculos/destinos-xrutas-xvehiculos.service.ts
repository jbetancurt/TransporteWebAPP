import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DestinosXRutasXVehiculos } from './destinos-xrutas-xvehiculos.model';
const urlPage = environment.apiUrl +'/destinos-xrutas-xvehiculos';

@Injectable({
  providedIn: 'root'
})
export default class DestinosXRutasXVehiculosService {
  _DestinosXRutasXVehiculos? : DestinosXRutasXVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<DestinosXRutasXVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<DestinosXRutasXVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_DestinosXRutasXVehiculos : DestinosXRutasXVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_DestinosXRutasXVehiculos.idDestinoXRutaXVehiculo), _DestinosXRutasXVehiculos, environment.httpOptions);
  }
  
  public create(_DestinosXRutasXVehiculos : DestinosXRutasXVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _DestinosXRutasXVehiculos, environment.httpOptions);
  }

  public delete(idDestinoXRutaXVehiculo: string){
     this.httpClient.delete(urlPage + '/' + idDestinoXRutaXVehiculo, environment.httpOptions);
 }
}
