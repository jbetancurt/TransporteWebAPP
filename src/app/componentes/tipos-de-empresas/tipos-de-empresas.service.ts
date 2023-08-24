import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeEmpresas } from './tipos-de-empresas.model';
const urlPage = environment.apiUrl +'/tiposdeempresas';

@Injectable({
  providedIn: 'root'
})
export class TiposDeEmpresasService {
  _TiposDeEmpresas? : TiposDeEmpresas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeEmpresas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeEmpresas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeEmpresas[]>{
    
    return this.httpClient.get<TiposDeEmpresas[]>(urlPage, environment.httpOptions);
  }


  public Edit(_TiposDeEmpresas : TiposDeEmpresas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeEmpresas.idTipoDeEmpresa), _TiposDeEmpresas, environment.httpOptions);
  }
  
  public create(_TiposDeEmpresas : TiposDeEmpresas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeEmpresas, environment.httpOptions);
  }

  public delete(idTipoDeEmpresa: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeEmpresa, environment.httpOptions);
  }
}


