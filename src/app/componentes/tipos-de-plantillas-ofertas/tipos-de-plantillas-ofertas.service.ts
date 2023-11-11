import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDePlantillasOfertas } from './tipos-de-plantillas-ofertas.model';
const urlPage = environment.apiUrl +'/tiposdeplantillasofertas';

@Injectable({
  providedIn: 'root'
})


export class TiposDePlantillasOfertasService {
  _TiposDePlantillasOfertas? : TiposDePlantillasOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDePlantillasOfertas>{ 
    let url = urlPage + "/" + id; 
    
    let obj =this.httpClient.get<TiposDePlantillasOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDePlantillasOfertas[]>{
    
    return this.httpClient.get<TiposDePlantillasOfertas[]>(urlPage, environment.httpOptions);
  }
  public ConsultarPorEnum(enumerador : string): Observable<TiposDePlantillasOfertas>{
    let ruta = urlPage + "/ConsultarPorEnum/" + enumerador;
    return this.httpClient.get<TiposDePlantillasOfertas>(ruta, environment.httpOptions);
  }


  public Edit(_TiposDePlantillasOfertas : TiposDePlantillasOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDePlantillasOfertas.idTipoDePlantillaOferta), _TiposDePlantillasOfertas, environment.httpOptions);
  }
  
  public create(_TiposDePlantillasOfertas : TiposDePlantillasOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDePlantillasOfertas, environment.httpOptions);
  }

  public delete(idTipoDePlantillaOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDePlantillaOferta, environment.httpOptions);
  }
}
