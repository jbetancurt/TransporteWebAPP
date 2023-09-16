import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SedesEmpleados } from './sedes-empleados.model';
const urlPage = environment.apiUrl +'/sedesempleados';

@Injectable({
  providedIn: 'root'
})
export class SedesEmpleadosService {
  _SedesEmpleados? : SedesEmpleados[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<SedesEmpleados>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<SedesEmpleados>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<SedesEmpleados[]>{
    
    return this.httpClient.get<SedesEmpleados[]>(urlPage, environment.httpOptions);
  }

  public Edit(_SedesEmpleados : SedesEmpleados): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_SedesEmpleados.idSedeEmpleado), _SedesEmpleados, environment.httpOptions);
  }
  
  public create(_SedesEmpleados : SedesEmpleados): Observable<number>{
    return this.httpClient.post<number>(urlPage, _SedesEmpleados, environment.httpOptions);
  }

  public delete(idSedeEmpleado: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idSedeEmpleado, environment.httpOptions);
  }
  
}



