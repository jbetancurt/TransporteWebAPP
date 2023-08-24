import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposOrientacionesDeLaOferta } from './tipos-orientaciones-de-la-oferta.model';
const urlPage = environment.apiUrl +'/tiposorientacionesdelaoferta';

@Injectable({
  providedIn: 'root'
})
export class TiposOrientacionesDeLaOfertaService {
  _TiposOrientacionesDeLaOferta? : TiposOrientacionesDeLaOferta[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposOrientacionesDeLaOferta>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposOrientacionesDeLaOferta>(url, environment.httpOptions);
    return obj;
  }


  public GetAll(): Observable<TiposOrientacionesDeLaOferta[]>{
    
    return this.httpClient.get<TiposOrientacionesDeLaOferta[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposOrientacionesDeLaOferta.idTipoOrientacionOferta), _TiposOrientacionesDeLaOferta, environment.httpOptions);
  }
  
  public create(_TiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposOrientacionesDeLaOferta, environment.httpOptions);
  }

  
  public delete(idTipoOrientacionOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoOrientacionOferta, environment.httpOptions);
  }
}


