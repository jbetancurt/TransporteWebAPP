import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposDeCarrocerias } from './tipos-de-carrocerias.model';
const urlPage = environment.apiUrl +'/tiposdecarrocerias';

@Injectable({
  providedIn: 'root'
})
export class TiposDeCarroceriasService {
  _TiposDeCarrocerias? : TiposDeCarrocerias[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<TiposDeCarrocerias>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<TiposDeCarrocerias>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<TiposDeCarrocerias[]>{
    
    return this.httpClient.get<TiposDeCarrocerias[]>(urlPage, environment.httpOptions);
  }

  public Edit(_TiposDeCarrocerias : TiposDeCarrocerias): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_TiposDeCarrocerias.idTipoDeCarroceria), _TiposDeCarrocerias, environment.httpOptions);
  }
  
  public create(_TiposDeCarrocerias : TiposDeCarrocerias): Observable<number>{
    return this.httpClient.post<number>(urlPage, _TiposDeCarrocerias, environment.httpOptions);
  }

  

   public delete(idTipoDeCarroceria: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idTipoDeCarroceria, environment.httpOptions);
  }
}



