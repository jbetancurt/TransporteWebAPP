import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SedesEmpleados } from './sedes-empleados.model';
const urlPage = environment.apiUrl +'/sedes-empleados';

@Injectable({
  providedIn: 'root'
})
export default class SedesEmpleadosService {
  _SedesEmpleados? : SedesEmpleados[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<SedesEmpleados>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<SedesEmpleados>(url, environment.httpOptions);
    return obj;
  }

  public Edit(_SedesEmpleados : SedesEmpleados): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_SedesEmpleados.idSedeEmpleado), _SedesEmpleados, environment.httpOptions);
  }
  
  public create(_SedesEmpleados : SedesEmpleados): Observable<number>{
    return this.httpClient.post<number>(urlPage, _SedesEmpleados, environment.httpOptions);
  }

  public delete(idSedeEmpleado: string){
     this.httpClient.delete(urlPage + '/' + idSedeEmpleado, environment.httpOptions);
 }
}



