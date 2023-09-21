import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: true,
    paginator: [5,10, 25, 50, 100],
    httpOptions : { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) },
    apiUrl : "https://localhost:7194/api",
    OAuth: {
        AuthCodeEndPoint : "https://login.microsoftonline.com/68e0f309-f4a3-48cb-9bc9-377be6679da7/oauth2/v2.0/authorize",
        RedirectURI : "http://localhost:4200/auth/login-callback",
        ClientId : "b694c6e2-e52e-48dc-8302-301ebd62592c",
        Scope : "https://graph.microsoft.com/User.Read",
        state : "1234567890",
    },
    NombreAplicacion :"Transporte de Carga"
};
