import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCallbackGoogleService } from './';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login-callback-google',
  templateUrl: './login-callback-google.component.html',
  styleUrls: ['./login-callback-google.component.scss']
})
export class LoginCallbackGoogleComponent implements OnInit {
    constructor(
      private route: ActivatedRoute,
      private loginCallBackService : LoginCallbackGoogleService,
      private loginService : LoginService,
      public router: Router
      ) {}
  
    ngOnInit() {
      
      this.route.queryParams.subscribe((params : any) => {
          
          if (params.code){
            //console.log(params.code);
            this.loginCallBackService.Post(params.code, params.state ?? "").subscribe({
              next: (data : any) => { 
                if (data.autenticado && data.respuesta != null && data.respuesta != ""){
                  this.loginService.saveToken(data.respuesta);
                  if (this.loginService.IsSingned()){
                    window.location.href="/"
                  }
                  
                  //window.location.reload();
                }
              },
              error: (err : string) => { console.error(err); }
            }); 
          }
      });
    }

}
