import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarroceriasXTiposDeVehiculos } from './carrocerias-xtipos-de-vehiculos.model';
const urlPage = environment.apiUrl +'/carrocerias-xtipos-de-vehiculos';

 
@Injectable({
  providedIn: 'root'
})
export default class CarroceriasXTiposDeVehiculosService {
  _CarroceriasXTiposDeVehiculos? : CarroceriasXTiposDeVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<CarroceriasXTiposDeVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<CarroceriasXTiposDeVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_CarroceriasXTiposDeVehiculos : CarroceriasXTiposDeVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_CarroceriasXTiposDeVehiculos.idCarroceriaXTipoDeVehiculo), _CarroceriasXTiposDeVehiculos, environment.httpOptions);
  }
  
  public create(_CarroceriasXTiposDeVehiculos : CarroceriasXTiposDeVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _CarroceriasXTiposDeVehiculos, environment.httpOptions);
  }

  public delete(idCarroceriaXTipoDeVehiculo : string){
     this.httpClient.delete(urlPage + '/' + idCarroceriaXTipoDeVehiculo, environment.httpOptions);
 }
}

