import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlantillasRequisitosXOfertas } from './plantillas-requisitos-xofertas.model';
const urlPage = environment.apiUrl +'/plantillas_requisitosxofertas';

@Injectable({
  providedIn: 'root'
})
export  class PlantillasRequisitosXOfertasServices {
  _PlantillasRequisitosXOfertas? : PlantillasRequisitosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PlantillasRequisitosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PlantillasRequisitosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<PlantillasRequisitosXOfertas[]>{
    
    return this.httpClient.get<PlantillasRequisitosXOfertas[]>(urlPage, environment.httpOptions);
  }

  public ConsultarXOferta(idOferta : string): Observable<PlantillasRequisitosXOfertas[]>{
    let ruta = urlPage + "/consultarxoferta/" + idOferta;
    return this.httpClient.get<PlantillasRequisitosXOfertas[]>(ruta, environment.httpOptions);
  }

  public Edit(_PlantillasRequisitosXOfertas : PlantillasRequisitosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PlantillasRequisitosXOfertas.idRequisitoXOferta), _PlantillasRequisitosXOfertas, environment.httpOptions);
  }
  
  public create(_PlantillasRequisitosXOfertas : PlantillasRequisitosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PlantillasRequisitosXOfertas, environment.httpOptions);
  }
  public delete(idPlantillaRequisitoXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idPlantillaRequisitoXOferta, environment.httpOptions);
  }
  public BorrarPorIdOferta(idOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/borrarporidoferta/' + idOferta, environment.httpOptions);
  }
  
}


