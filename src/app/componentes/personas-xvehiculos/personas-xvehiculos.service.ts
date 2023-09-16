import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonasXVehiculos } from './personas-xvehiculos.model';
const urlPage = environment.apiUrl +'/personasxvehiculos';

@Injectable({
  providedIn: 'root'
})
export class PersonasXVehiculosService {
  _PersonasXVehiculos? : PersonasXVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PersonasXVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PersonasXVehiculos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<PersonasXVehiculos[]>{
    
    return this.httpClient.get<PersonasXVehiculos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_PersonasXVehiculos : PersonasXVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PersonasXVehiculos.idPersonaXVehiculo), _PersonasXVehiculos, environment.httpOptions);
  }
  
  public create(_PersonasXVehiculos : PersonasXVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PersonasXVehiculos, environment.httpOptions);
  }

  public delete(idPersonaXVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idPersonaXVehiculo, environment.httpOptions);
  }

}
