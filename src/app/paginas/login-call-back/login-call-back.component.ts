import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginCallBackService } from './login-call-back.service';

@Component({
  selector: 'app-login-call-back',
  templateUrl: './login-call-back.component.html',
  styleUrls: ['./login-call-back.component.css']
})
export class LoginCallBackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private servicio : LoginCallBackService
    ) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe((params : any) => {
        if (params.code){
          console.log(params.code);
          this.servicio.Post(params.code, params.state ?? "").subscribe({
            next: (data : any) => { 
              console.log(data);
              
              
            },
            error: (err : string) => { console.error(err); }
          }); 
        }
      });
  }

}
