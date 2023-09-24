import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadosDeLasNotificaciones } from './estados-de-las-notificaciones.model';
const urlPage = environment.apiUrl +'/estadosdelasnotificaciones';

@Injectable({
  providedIn: 'root'
})

export class EstadosDeLasNotificacionesService {
  _EstadosDeLasNotificaciones? : EstadosDeLasNotificaciones[];
  constructor(private httpClient : HttpClient) { }
  
  public Get(id : string): Observable<EstadosDeLasNotificaciones>{ 
    let url = urlPage + "/" + id; 
    console.log(url);  
    let obj =this.httpClient.get<EstadosDeLasNotificaciones>(url, environment.httpOptions);
    return obj;
  }

  public GetAll(): Observable<EstadosDeLasNotificaciones[]>{
    
    return this.httpClient.get<EstadosDeLasNotificaciones[]>(urlPage, environment.httpOptions);
  }


  public Edit(_EstadosDeLasNotificaciones : EstadosDeLasNotificaciones): Observable<boolean>{
    return this.httpClient.put<boolean>(urlPage + '/' + (_EstadosDeLasNotificaciones.idEstadoDeLaNotificacion), _EstadosDeLasNotificaciones, environment.httpOptions);
  }
  
  public create(_EstadosDeLasNotificaciones : EstadosDeLasNotificaciones): Observable<number>{
    return this.httpClient.post<number>(urlPage, _EstadosDeLasNotificaciones, environment.httpOptions);
  }

  public delete(idEstadoDeLaNotificacion: string): Observable<void> {
    return this.httpClient.delete<void>(urlPage + '/' + idEstadoDeLaNotificacion, environment.httpOptions);
  }
}

