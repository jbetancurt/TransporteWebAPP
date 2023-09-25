import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private loginService : LoginService,
    public router: Router
  ){}
  ngOnInit(): void {
    this.loginService.signOut();
    this.router.navigate(['/login']);
  }

}
