import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeArchivosAdjuntos } from './tipos-de-archivos-adjuntos.model';
const urlPage = environment.apiUrl +'/tiposdearchivosadjuntos';

@Injectable({
  providedIn: 'root'
})
export class TiposDeArchivosAdjuntosService {
  _TiposDeArchivosAdjuntos? : TiposDeArchivosAdjuntos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeArchivosAdjuntos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeArchivosAdjuntos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeArchivosAdjuntos[]>{
    
    return this.httpClient.get<TiposDeArchivosAdjuntos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposDeArchivosAdjuntos : TiposDeArchivosAdjuntos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeArchivosAdjuntos.idTipoDeArchivoAdjunto), _TiposDeArchivosAdjuntos, environment.httpOptions);
  }
  
  public create(_TiposDeArchivosAdjuntos : TiposDeArchivosAdjuntos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeArchivosAdjuntos, environment.httpOptions);
  }

  public delete(idTipoDeArchivoAdjunto: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeArchivoAdjunto, environment.httpOptions);
  }
  
}

