import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolesXEmpresas } from './roles-xempresas.model';
const urlPage = environment.apiUrl +'/rolesxempresas';

@Injectable({
  providedIn: 'root'
})
export  class RolesXEmpresasService {
  _RolesXEmpresas? : RolesXEmpresas[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<RolesXEmpresas>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<RolesXEmpresas>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<RolesXEmpresas[]>{
    
    return this.httpClient.get<RolesXEmpresas[]>(urlPage, environment.httpOptions);
  }


  public Edit(_RolesXEmpresas : RolesXEmpresas): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_RolesXEmpresas.idRolXEmpresa), _RolesXEmpresas, environment.httpOptions);
  }
  
  public create(_RolesXEmpresas : RolesXEmpresas): Observable<number>{
    return this.httpClient.post<number>(urlPage, _RolesXEmpresas, environment.httpOptions);
  }


  public delete(idRolXEmpresa: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idRolXEmpresa, environment.httpOptions);
  }
  
}

