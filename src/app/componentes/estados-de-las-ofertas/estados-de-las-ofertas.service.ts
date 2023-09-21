import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadosDeLasOfertas } from './estados-de-las-ofertas.model';
const urlPage = environment.apiUrl +'/estadosdelasofertas';

@Injectable({
  providedIn: 'root'
})


export class EstadosDeLasOfertasService {
  _EstadosDeLasOfertas? : EstadosDeLasOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<EstadosDeLasOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<EstadosDeLasOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<EstadosDeLasOfertas[]>{
    
    return this.httpClient.get<EstadosDeLasOfertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_EstadosDeLasOfertas : EstadosDeLasOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_EstadosDeLasOfertas.idEstadoDeLaOferta), _EstadosDeLasOfertas, environment.httpOptions);
  }
  
  public create(_EstadosDeLasOfertas : EstadosDeLasOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _EstadosDeLasOfertas, environment.httpOptions);
  }
  public delete(idEstadoDeLaOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idEstadoDeLaOferta, environment.httpOptions);
  }
 
 
}
