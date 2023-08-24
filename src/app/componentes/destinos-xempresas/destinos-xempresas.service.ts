import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DestinosXEmpresas } from './destinos-xempresas.model';
const urlPage = environment.apiUrl +'/destinos-xempresas';

@Injectable({
  providedIn: 'root'
})
export default class DestinosXEmpresasService {
  _DestinosXEmpresas? : DestinosXEmpresas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<DestinosXEmpresas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<DestinosXEmpresas>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_DestinosXEmpresas : DestinosXEmpresas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_DestinosXEmpresas.idDestinoXEmpresa), _DestinosXEmpresas, environment.httpOptions);
  }
  
  public create(_DestinosXEmpresas : DestinosXEmpresas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _DestinosXEmpresas, environment.httpOptions);
  }

  public delete(idDestinoXEmpresa: string){
     this.httpClient.delete(urlPage + '/' + idDestinoXEmpresa, environment.httpOptions);
 }
}
  