import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeLugaresXOfertas } from './tipos-de-lugares-xofertas.model';
const urlPage = environment.apiUrl +'/tiposdelugaresxofertas';




@Injectable({
  providedIn: 'root'
})
export class TiposDeLugaresXOfertasService {
  _TiposDeLugaresXOfertas? : TiposDeLugaresXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeLugaresXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeLugaresXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeLugaresXOfertas[]>{
    
    return this.httpClient.get<TiposDeLugaresXOfertas[]>(urlPage, environment.httpOptions);
  }


  public Edit(_TiposDeLugaresXOfertas : TiposDeLugaresXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeLugaresXOfertas.idTipoDeLugarXOferta), _TiposDeLugaresXOfertas, environment.httpOptions);
  }
  
  public create(_TiposDeLugaresXOfertas : TiposDeLugaresXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeLugaresXOfertas, environment.httpOptions);
  }

  public delete(idTipoDeLugarXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeLugarXOferta, environment.httpOptions);
  }
}


