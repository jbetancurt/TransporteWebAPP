import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RutasXVehiculos } from './rutas-xvehiculos.model';
const urlPage = environment.apiUrl +'/rutas-xvehiculos';

@Injectable({
  providedIn: 'root'
})
export default class RutasXVehiculosService {
  _RutasXVehiculos? : RutasXVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RutasXVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RutasXVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_RutasXVehiculos : RutasXVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RutasXVehiculos.idRutaXVehiculo), _RutasXVehiculos, environment.httpOptions);
  }
  
  public create(_RutasXVehiculos : RutasXVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RutasXVehiculos, environment.httpOptions);
  }

  public delete(idRutaXVehiculo: string){
     this.httpClient.delete(urlPage + '/' + idRutaXVehiculo, environment.httpOptions);
 }
}

