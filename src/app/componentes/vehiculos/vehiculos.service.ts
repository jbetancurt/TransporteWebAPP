import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehiculos } from './vehiculos.model';
const urlPage = environment.apiUrl +'/vehiculos';

@Injectable({
  providedIn: 'root'
})
export default class VehiculosService {
  _Vehiculos? : Vehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Vehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Vehiculos>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Vehiculos : Vehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Vehiculos.idVehiculo), _Vehiculos, environment.httpOptions);
  }
  
  public create(_Vehiculos : Vehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Vehiculos, environment.httpOptions);
  }

  public delete(idVehiculo: string){
     this.httpClient.delete(urlPage + '/' + idVehiculo, environment.httpOptions);
 }
}

