import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private servicio : LoginService
    ) {}

  loginMSN(){
    this.servicio.redirectToMSNLogin();
  }
}