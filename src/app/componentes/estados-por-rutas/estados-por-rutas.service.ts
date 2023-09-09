import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadosPorRutas } from './estados-por-rutas.model';
const urlPage = environment.apiUrl +'/estadosporrutas';

@Injectable({
  providedIn: 'root'
})
export class EstadosPorRutasService {
  _EstadosPorRutas? : EstadosPorRutas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<EstadosPorRutas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<EstadosPorRutas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<EstadosPorRutas[]>{
    
    return this.httpClient.get<EstadosPorRutas[]>(urlPage, environment.httpOptions);
  }

  
  public Edit(_EstadosPorRutas : EstadosPorRutas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_EstadosPorRutas.idEstadoPorRuta), _EstadosPorRutas, environment.httpOptions);
  }
  
  public create(_EstadosPorRutas : EstadosPorRutas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _EstadosPorRutas, environment.httpOptions);
  }

  public delete(idEstadoPorRuta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idEstadoPorRuta, environment.httpOptions);
 }
}


