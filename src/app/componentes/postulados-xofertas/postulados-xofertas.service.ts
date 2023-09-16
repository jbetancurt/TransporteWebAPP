import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostuladosXOfertas } from './postulados-xofertas.model';
const urlPage = environment.apiUrl +'/postuladosxofertas';

@Injectable({
  providedIn: 'root'
})
export  class PostuladosXOfertasService {
  _PostuladosXOfertas? : PostuladosXOfertas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<PostuladosXOfertas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<PostuladosXOfertas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<PostuladosXOfertas[]>{
    
    return this.httpClient.get<PostuladosXOfertas[]>(urlPage, environment.httpOptions);
  }

  public Edit(_PostuladosXOfertas : PostuladosXOfertas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_PostuladosXOfertas.idPostuladoXOferta), _PostuladosXOfertas, environment.httpOptions);
  }
  
  public create(_PostuladosXOfertas : PostuladosXOfertas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _PostuladosXOfertas, environment.httpOptions);
  }

  public delete(idPostuladoXOferta: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idPostuladoXOferta, environment.httpOptions);
  }

}

