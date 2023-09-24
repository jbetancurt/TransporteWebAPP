import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlantillasLugaresXOfertas } from './plantillas-lugares-xofertas.model';
const urlPage = environment.apiUrl +'/plantillas_lugaresxofertas';

@Injectable({
  providedIn: 'root'
})


export class PlantillasLugaresXOfertasService {
  _PlantillasLugaresXOfertas? : PlantillasLugaresXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PlantillasLugaresXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PlantillasLugaresXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<PlantillasLugaresXOfertas[]>{
    
    return this.httpClient.get<PlantillasLugaresXOfertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_PlantillasLugaresXOfertas : PlantillasLugaresXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PlantillasLugaresXOfertas.idLugarXOferta), _PlantillasLugaresXOfertas, environment.httpOptions);
  }
  
  public create(_PlantillasLugaresXOfertas : PlantillasLugaresXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PlantillasLugaresXOfertas, environment.httpOptions);
  }

  public delete(idLugarXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idLugarXOferta, environment.httpOptions);
  }
 
}

