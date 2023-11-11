import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeVehiculos } from './tipos-de-vehiculos.model';
const urlPage = environment.apiUrl +'/tiposdevehiculos';

@Injectable({
  providedIn: 'root'
})
export class TiposDeVehiculosService {
  _TiposDeVehiculos? : TiposDeVehiculos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeVehiculos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeVehiculos>(url, environment.httpOptions);
    return obj;
  }
  public async  GetAllPromesa(): Promise<TiposDeVehiculos[]>{
     
    return await firstValueFrom( this.httpClient.get<TiposDeVehiculos[]>(urlPage, environment.httpOptions));
  }
  
  public GetAll(): Observable<TiposDeVehiculos[]>{
    return this.httpClient.get<TiposDeVehiculos[]>(urlPage, environment.httpOptions);
  }
  
  public Edit(_TiposDeVehiculos : TiposDeVehiculos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeVehiculos.idTipoDeVehiculo), _TiposDeVehiculos, environment.httpOptions);
  }
  
  public create(_TiposDeVehiculos : TiposDeVehiculos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeVehiculos, environment.httpOptions);
  }
 

  public delete(idTipoDeVehiculo: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeVehiculo, environment.httpOptions);
  }
}



