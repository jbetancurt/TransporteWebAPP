import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const UsuarioLoguiadoKey= 'usuario-autenticado';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public redirectToMSNLogin(){
    let s = `${environment.OAuth.AuthCodeEndPoint}${"?response_type=code&client_id="}${environment.OAuth.ClientId}`;
    s+= `${"&Redirect_uri="}${environment.OAuth.RedirectURI}${"&scope="}${environment.OAuth.Scope}${"&state=1234567890"}`;
    window.location.href = s;
    
    //this.router.navigate([s])
  }

  public saveUser(): void {
    window.sessionStorage.removeItem(UsuarioLoguiadoKey);
    window.sessionStorage.setItem(UsuarioLoguiadoKey, JSON.stringify({"idEmpresa": 4}));
  }
  
  public getUser() {
    let user = window.sessionStorage.getItem(UsuarioLoguiadoKey);
    if (user) {
      return JSON.parse(user);
    }
    return JSON.parse('{}');
  }
}
