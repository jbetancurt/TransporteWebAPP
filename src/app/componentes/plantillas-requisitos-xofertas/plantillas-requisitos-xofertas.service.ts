import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlantillasRequisitosXOfertas } from './plantillas-requisitos-xofertas.model';
const urlPage = environment.apiUrl +'/plantillas-requisitos-xofertas';

@Injectable({
  providedIn: 'root'
})
export default class PlantillasRequisitosXOfertasServices {
  _PlantillasRequisitosXOfertas? : PlantillasRequisitosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PlantillasRequisitosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PlantillasRequisitosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_PlantillasRequisitosXOfertas : PlantillasRequisitosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PlantillasRequisitosXOfertas.idRequisitoXOferta), _PlantillasRequisitosXOfertas, environment.httpOptions);
  }
  
  public create(_PlantillasRequisitosXOfertas : PlantillasRequisitosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PlantillasRequisitosXOfertas, environment.httpOptions);
  }

  public delete(idPlantillaRequisitoXOferta: string){
     this.httpClient.delete(urlPage + '/' + idPlantillaRequisitoXOferta, environment.httpOptions);
 }
}


