import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeDocumentos } from './tipos-de-documentos.model';
const urlPage = environment.apiUrl +'/tiposdedocumentos';


@Injectable({
  providedIn: 'root'
})
export class TiposDeDocumentosService {
  _TiposDeDocumentos? : TiposDeDocumentos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeDocumentos>{ 
    let url = urlPage + "/" + id; 
    let obj =this.httpClient.get<TiposDeDocumentos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeDocumentos[]>{
    
    return this.httpClient.get<TiposDeDocumentos[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposDeDocumentos : TiposDeDocumentos): Observable<boolean>{
    let url = urlPage + "/" + _TiposDeDocumentos.idTipoDeDocumento.toString();
    return this.httpClient.put<boolean>(url, _TiposDeDocumentos, environment.httpOptions);
  }
  
  public create(_TiposDeDocumentos : TiposDeDocumentos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeDocumentos, environment.httpOptions);
  }

  public delete(idTipoDeDocumento: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeDocumento, environment.httpOptions);
  }
}