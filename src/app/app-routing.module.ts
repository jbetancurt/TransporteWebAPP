import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { WelcomeComponent } from './componentes/welcome/welcome.component';
import { LoginComponent } from './paginas/login';
import { LoginCallBackComponent } from './paginas/login-call-back';
import { LoginCallbackGoogleComponent } from './paginas/login-callback-google';
import { OfertasGeneradasComponent} from './paginas/ofertas/ofertas-generadas';
import { OfertaPaqueteoComponent } from './paginas/ofertas/oferta-paqueteo';
import { OfertasConfiguracionDestinosComponent } from './paginas/ofertas/ofertas-configuracion/ofertas-configuracion-destinos';
import { OfertasConfiguracionPlanillasComponent } from './paginas/ofertas/ofertas-configuracion/ofertas-configuracion-planillas';
import { OfertasConfiguracionRequisitosComponent } from './paginas/ofertas/ofertas-configuracion/ofertas-configuracion-requisitos';
import { EnviarOfertaComponent } from './paginas/ofertas/enviar-oferta';
import { ContactosTodosComponent } from './paginas/contacto/contactos-todos';
import { ContactosClientesComponent} from './paginas/contacto/contactos-clientes';
import { ContactosFlotaPropiaComponent } from './paginas/contacto/contactos-flota-propia';
import { ContactosFlotaFidelizadaComponent } from './paginas/contacto/contactos-flota-fidelizada';
import { CrearUsuariosComponent } from './paginas/configuracion/crear-usuarios';
import { ConfiguracionDatosPersonalesComponent } from './paginas/configuracion/configuracion-datos-personales';
import { ConfiguracionDetalladaComponent } from './paginas/configuracion/configuracion-detallada';

import { from } from 'rxjs';
const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'auth/login-callback', component: LoginCallBackComponent },
  {path: 'auth/login-callback-google', component: LoginCallbackGoogleComponent },
  {path: 'ofertas/ofertas-generadas', component: OfertasGeneradasComponent },
  {path: 'ofertas/oferta-paqueteo', component: OfertaPaqueteoComponent },
  {path: 'ofertas/ofertas-configuracion/ofertas-configuracion-destinos', component: OfertasConfiguracionDestinosComponent },
  {path: 'ofertas/ofertas-configuracion/ofertas-configuracion-planillas', component: OfertasConfiguracionPlanillasComponent },
  {path: 'ofertas/ofertas-configuracion/ofertas-configuracion-requisitos', component: OfertasConfiguracionRequisitosComponent },
  
  {path: 'ofertas/enviar-oferta', component: EnviarOfertaComponent },
  {path: 'contacto/contactos-todos', component: ContactosTodosComponent },
  {path: 'contacto/contactos-clientes', component: ContactosClientesComponent },
  {path: 'contacto/contactos-flota-propia', component: ContactosFlotaPropiaComponent },
  {path: 'contacto/contactos-flota-fidelizada', component: ContactosFlotaFidelizadaComponent },
  {path: 'configuracion/crear-usuarios', component: CrearUsuariosComponent },
  {path: 'configuracion/configuracion-datos-personales', component: ConfiguracionDatosPersonalesComponent },
  {path: 'configuracion/configuracion-detallada', component: ConfiguracionDetalladaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
