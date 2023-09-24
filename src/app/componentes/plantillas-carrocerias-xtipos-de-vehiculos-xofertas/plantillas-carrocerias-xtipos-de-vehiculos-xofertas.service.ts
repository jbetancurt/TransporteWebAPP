import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import  { PlantillasCarroceriasXTiposDeVehiculosXOfertas } from './plantillas-carrocerias-xtipos-de-vehiculos-xofertas.model';
const urlPage = environment.apiUrl +'/plantillas_carroceriasxtiposdevehiculosxofertas';




@Injectable({
  providedIn: 'root'
})
export class PlantillasCarroceriasXTiposDeVehiculosXOfertasService {
  _PlantillasCarroceriasXTiposDeVehiculosXOfertas? : PlantillasCarroceriasXTiposDeVehiculosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PlantillasCarroceriasXTiposDeVehiculosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PlantillasCarroceriasXTiposDeVehiculosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<PlantillasCarroceriasXTiposDeVehiculosXOfertas[]>{
    console.log(urlPage);
    return this.httpClient.get<PlantillasCarroceriasXTiposDeVehiculosXOfertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_PlantillasCarroceriasXTiposDeVehiculosXOfertas : PlantillasCarroceriasXTiposDeVehiculosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PlantillasCarroceriasXTiposDeVehiculosXOfertas.idOferta), _PlantillasCarroceriasXTiposDeVehiculosXOfertas, environment.httpOptions);
  }
  
  public create(_PlantillasCarroceriasXTiposDeVehiculosXOfertas : PlantillasCarroceriasXTiposDeVehiculosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PlantillasCarroceriasXTiposDeVehiculosXOfertas, environment.httpOptions);
  }
  public delete(idCarroceriaXTipoDeVehiculoXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idCarroceriaXTipoDeVehiculoXOferta, environment.httpOptions);
  }
 
}
