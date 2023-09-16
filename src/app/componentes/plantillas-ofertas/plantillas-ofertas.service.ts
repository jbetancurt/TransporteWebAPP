import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plantillas_Ofertas } from './plantillas-ofertas.model';
const urlPage = environment.apiUrl +'/plantillas_ofertas';

@Injectable({
  providedIn: 'root'
})
export class Plantillas_OfertasService {
  _Plantillas_Ofertas? : Plantillas_Ofertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Plantillas_Ofertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Plantillas_Ofertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Plantillas_Ofertas[]>{
    console.log(urlPage);
    return this.httpClient.get<Plantillas_Ofertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_Plantillas_Ofertas : Plantillas_Ofertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Plantillas_Ofertas.idOferta), _Plantillas_Ofertas, environment.httpOptions);
  }
  
  public create(_Plantillas_Ofertas : Plantillas_Ofertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Plantillas_Ofertas, environment.httpOptions);
  }
  public delete(idPlanillaOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idPlanillaOferta, environment.httpOptions);
  }
 
}

