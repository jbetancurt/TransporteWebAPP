import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private loginService : LoginService
    ) {}

  loginMSN(){
    this.loginService.redirectToMSNLogin();
  }
}
