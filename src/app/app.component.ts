import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './paginas/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit  {
  logeado = false;
  ngOnInit(): void {
    //alert(this.loginService.GetTokenString())
    this.logeado = this.loginService.IsSingned();

    //this.loginService.saveUser();
  }
  
  titulo = environment.NombreAplicacion;
  public obteneridEmpresa():number{
    return 4;
  }


  constructor(
    private loginService:LoginService
  ) { }
}

