import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistorialesDeLasOfertas } from './historiales-de-las-ofertas.model';
const urlPage = environment.apiUrl +'/historialesdelasofertas';

@Injectable({
  providedIn: 'root'
})



export class HistorialesDeLasOfertasService {
  _HistorialesDeLasOfertas? : HistorialesDeLasOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<HistorialesDeLasOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<HistorialesDeLasOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<HistorialesDeLasOfertas[]>{
    
    return this.httpClient.get<HistorialesDeLasOfertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_HistorialesDeLasOfertas : HistorialesDeLasOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_HistorialesDeLasOfertas.idHistorialDeLaOferta), _HistorialesDeLasOfertas, environment.httpOptions);
  }
  
  public create(_HistorialesDeLasOfertas : HistorialesDeLasOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _HistorialesDeLasOfertas, environment.httpOptions);
  }

  public delete(idHistorialDeLaOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idHistorialDeLaOferta, environment.httpOptions);
  }
 
}

