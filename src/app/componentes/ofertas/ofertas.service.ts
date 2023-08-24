import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ofertas } from './ofertas.model';
const urlPage = environment.apiUrl +'/ofertas';

@Injectable({
  providedIn: 'root'
})
export default class OfertasService {
  _Ofertas? : Ofertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Ofertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Ofertas>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_Ofertas : Ofertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Ofertas.idOferta), _Ofertas, environment.httpOptions);
  }
  
  public create(_Ofertas : Ofertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Ofertas, environment.httpOptions);
  }

  public delete(idOferta: string){
     this.httpClient.delete(urlPage + '/' + idOferta, environment.httpOptions);
 }
}

