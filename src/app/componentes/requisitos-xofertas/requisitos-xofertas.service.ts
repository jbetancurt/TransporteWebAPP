import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitosXOfertas } from './requisitos-xofertas.model';
const urlPage = environment.apiUrl +'/requisitosxofertas';

@Injectable({
  providedIn: 'root'
})
export class RequisitosXOfertasService {
  _RequisitosXOfertas? : RequisitosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RequisitosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RequisitosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<RequisitosXOfertas[]>{
    
    return this.httpClient.get<RequisitosXOfertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_RequisitosXOfertas : RequisitosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RequisitosXOfertas.idRequisitoXOferta), _RequisitosXOfertas, environment.httpOptions);
  }
  
  public create(_RequisitosXOfertas : RequisitosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RequisitosXOfertas, environment.httpOptions);
  }

  public delete(idRequisitoXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idRequisitoXOferta, environment.httpOptions);
  }
  
}

