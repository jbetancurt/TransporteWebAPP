import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamentos } from './departamentos.model';
const urlPage = environment.apiUrl +'/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  _Departamentos? : Departamentos[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<Departamentos>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<Departamentos>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<Departamentos[]>{
    
    return this.httpClient.get<Departamentos[]>(urlPage, environment.httpOptions);
  }
  public GetByIdPais(idPaise : number): Observable<Departamentos[]>{
    
    return this.httpClient.get<Departamentos[]>(urlPage + "/ListarDepartamentos/" +idPaise, environment.httpOptions);
  }

  public Edit(_Departamentos : Departamentos): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_Departamentos.idDepartamento), _Departamentos, environment.httpOptions);
  }
  
  public create(_Departamentos : Departamentos): Observable<number>{
    return this.httpClient.post<number>(urlPage, _Departamentos, environment.httpOptions);
  }

  public delete(idDepartamento: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idDepartamento, environment.httpOptions);
  }
}
