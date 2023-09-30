import { HttpHeaders } from "@angular/common/http";

export const environment = {
    UsuarioLoguiadoKey: 'usuario-autenticado',
    production: true,
    paginator: [5,10, 25, 50, 100],
    httpOptions : { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) },
    apiUrl : "/api",
    jwtConfig :{
        "secret": "1baa1a52-4a19-4942-b7cc-c626dcf31a96"
    },
    OAuth: {
        AuthCodeEndPoint : "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        RedirectURI : "https://localhost:4200/auth/login-callback",
        ClientId : "2c9695c3-e82a-4112-a6bf-dd4beea8d27d",
        Scope : "https://graph.microsoft.com/User.Read",
        state : "1234567890",
    },
    OAuthGoogle: {
        ClientId : "761745688293-jra72nltsoor2g7enfjsu79te8pnnsdq.apps.googleusercontent.com",
        RedirectURI : "https://localhost:4200/auth/login-callback-google",
    },
    NombreAplicacion :"Transporte de Carga"
};
