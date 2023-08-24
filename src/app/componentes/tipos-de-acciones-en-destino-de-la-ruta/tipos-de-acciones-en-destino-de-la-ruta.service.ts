import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeAccionesEnDestinoDeLaRuta } from './tipos-de-acciones-en-destino-de-la-ruta.model';
const urlPage = environment.apiUrl +'/tiposdeaccionesendestinodelaruta';

@Injectable({
  providedIn: 'root'
})
export class TiposDeAccionesEnDestinoDeLaRutaService {
  _TiposDeAccionesEnDestinoDeLaRuta? : TiposDeAccionesEnDestinoDeLaRuta[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeAccionesEnDestinoDeLaRuta>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeAccionesEnDestinoDeLaRuta>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeAccionesEnDestinoDeLaRuta[]>{
    
    return this.httpClient.get<TiposDeAccionesEnDestinoDeLaRuta[]>(urlPage, environment.httpOptions);
  }


  public Edit(_TiposDeAccionesEnDestinoDeLaRuta : TiposDeAccionesEnDestinoDeLaRuta): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeAccionesEnDestinoDeLaRuta.idTipoDeAccionEnDestinoDeLaRuta), _TiposDeAccionesEnDestinoDeLaRuta, environment.httpOptions);
  }
  
  public create(_TiposDeAccionesEnDestinoDeLaRuta : TiposDeAccionesEnDestinoDeLaRuta): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeAccionesEnDestinoDeLaRuta, environment.httpOptions);
  }

  public delete(idTipoDeAccionEnDestinoDeLaRuta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeAccionEnDestinoDeLaRuta, environment.httpOptions);
  }

  
 }



