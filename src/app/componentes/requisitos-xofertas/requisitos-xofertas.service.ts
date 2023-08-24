import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitosXOfertas } from './requisitos-xofertas.model';
const urlPage = environment.apiUrl +'/requisitos-xofertas';

@Injectable({
  providedIn: 'root'
})
export default class RequisitosXOfertasService {
  _RequisitosXOfertas? : RequisitosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RequisitosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RequisitosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_RequisitosXOfertas : RequisitosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RequisitosXOfertas.idRequisitoXOferta), _RequisitosXOfertas, environment.httpOptions);
  }
  
  public create(_RequisitosXOfertas : RequisitosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RequisitosXOfertas, environment.httpOptions);
  }

  public delete(idRequisitoXOferta: string){
     this.httpClient.delete(urlPage + '/' + idRequisitoXOferta, environment.httpOptions);
 }
}

