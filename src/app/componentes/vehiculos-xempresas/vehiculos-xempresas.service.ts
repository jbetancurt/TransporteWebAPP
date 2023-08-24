import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehiculosXEmpresas } from './vehiculos-xempresas.model';
const urlPage = environment.apiUrl +'/vehiculos-xempresas';

@Injectable({
  providedIn: 'root'
})
export default class VehiculosXEmpresasService {
  _VehiculosXEmpresas? : VehiculosXEmpresas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<VehiculosXEmpresas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<VehiculosXEmpresas>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_VehiculosXEmpresas : VehiculosXEmpresas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_VehiculosXEmpresas.idVehiculoXEmpresa), _VehiculosXEmpresas, environment.httpOptions);
  }
  
  public create(_VehiculosXEmpresas : VehiculosXEmpresas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _VehiculosXEmpresas, environment.httpOptions);
  }

  public delete(idVehiculoXEmpresa: string){
     this.httpClient.delete(urlPage + '/' + idVehiculoXEmpresa, environment.httpOptions);
 }
}
