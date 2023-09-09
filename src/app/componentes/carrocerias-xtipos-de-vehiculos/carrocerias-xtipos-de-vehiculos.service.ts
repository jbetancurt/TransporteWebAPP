import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarroceriasXTiposDeVehiculos } from './carrocerias-xtipos-de-vehiculos.model';
const urlPage = environment.apiUrl +'/carroceriasxtiposdevehiculos';

 
@Injectable({
  providedIn: 'root'
})
export  class CarroceriasXTiposDeVehiculosService {
  _CarroceriasXTiposDeVehiculos? : CarroceriasXTiposDeVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<CarroceriasXTiposDeVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<CarroceriasXTiposDeVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<CarroceriasXTiposDeVehiculos[]>{
    
    return this.httpClient.get<CarroceriasXTiposDeVehiculos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_CarroceriasXTiposDeVehiculos : CarroceriasXTiposDeVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_CarroceriasXTiposDeVehiculos.idCarroceriaXTipoDeVehiculo), _CarroceriasXTiposDeVehiculos, environment.httpOptions);
  }
  
  public create(_CarroceriasXTiposDeVehiculos : CarroceriasXTiposDeVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _CarroceriasXTiposDeVehiculos, environment.httpOptions);
  }

  public delete(idCarroceriaXTipoDeVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idCarroceriaXTipoDeVehiculo, environment.httpOptions);
  }
}

