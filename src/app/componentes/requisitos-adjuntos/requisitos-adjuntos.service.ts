import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisitosAdjuntos } from './requisitos-adjuntos.model';
const urlPage = environment.apiUrl +'/requisitosadjuntos';

@Injectable({
  providedIn: 'root'
})
export  class RequisitosAdjuntosService {
  _RequisitosAdjuntos? : RequisitosAdjuntos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RequisitosAdjuntos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RequisitosAdjuntos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<RequisitosAdjuntos[]>{
    
    return this.httpClient.get<RequisitosAdjuntos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_RequisitosAdjuntos : RequisitosAdjuntos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RequisitosAdjuntos.idRequisitoAdjunto), _RequisitosAdjuntos, environment.httpOptions);
  }
  
  public create(_RequisitosAdjuntos : RequisitosAdjuntos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RequisitosAdjuntos, environment.httpOptions);
  }

  public delete(idRequisitoAdjunto: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idRequisitoAdjunto, environment.httpOptions);
}
}

