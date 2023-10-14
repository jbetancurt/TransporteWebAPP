import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import  { PlantillasCargasXOfertas } from './plantillas-cargas-xofertas.model';
const urlPage = environment.apiUrl +'/plantillas_cargasxofertas';


@Injectable({
  providedIn: 'root'
})
export class PlantillasCargasXOfertasService {
  _PlantillasCargasXOfertas? : PlantillasCargasXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PlantillasCargasXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PlantillasCargasXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<PlantillasCargasXOfertas[]>{
    console.log(urlPage);
    return this.httpClient.get<PlantillasCargasXOfertas[]>(urlPage, environment.httpOptions);
  }

  public ConsultarXOferta(idOferta : string): Observable<PlantillasCargasXOfertas[]>{
    let ruta = urlPage + "/consultarxoferta/" + idOferta;
    return this.httpClient.get<PlantillasCargasXOfertas[]>(ruta, environment.httpOptions);
  }

  public Edit(_PlantillasCargasXOfertas : PlantillasCargasXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PlantillasCargasXOfertas.idOferta), _PlantillasCargasXOfertas, environment.httpOptions);
  }
  
  public create(_PlantillasCargasXOfertas : PlantillasCargasXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PlantillasCargasXOfertas, environment.httpOptions);
  }
  public delete(idCargaXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idCargaXOferta, environment.httpOptions);
  }
 
}

