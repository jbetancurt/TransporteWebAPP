import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { WelcomeComponent } from './componentes/welcome/welcome.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { AccesosControlXPuntosComponent } from './componentes/accesos-control-xpuntos/accesos-control-xpuntos.component';

import { LoginCallBackComponent } from './paginas/login-call-back/login-call-back.component';
import { LoginComponent } from './paginas/login/login.component';

import { AdjuntosComponent } from './componentes/adjuntos/adjuntos.component';
import { CarroceriasXTiposDeVehiculosComponent } from './componentes/carrocerias-xtipos-de-vehiculos/carrocerias-xtipos-de-vehiculos.component';
import { CiudadesComponent } from './componentes/ciudades/ciudades.component';
import { ControlesXPuntosComponent } from './componentes/controles-xpuntos/controles-xpuntos.component';
import { DepartamentosComponent } from './componentes/departamentos/departamentos.component';
import { DesplazamientosXRutasXVehiculosComponent } from './componentes/desplazamientos-xrutas-xvehiculos/desplazamientos-xrutas-xvehiculos.component';
import { DestinosComponent } from './componentes/destinos/destinos.component';
import { DestinosXEmpresasComponent } from './componentes/destinos-xempresas/destinos-xempresas.component';
import { DestinosXRutasXVehiculosComponent } from './componentes/destinos-xrutas-xvehiculos/destinos-xrutas-xvehiculos.component';
import { EmpresasComponent } from './componentes/empresas/empresas.component';
import { EstadosPorRutasComponent } from './componentes/estados-por-rutas/estados-por-rutas.component';
import { MenusComponent } from './componentes/menus/menus.component';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';
import { PaisesComponent } from './componentes/paises/paises.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { PersonasXVehiculosComponent } from './componentes/personas-xvehiculos/personas-xvehiculos.component';
import { Plantillas_OfertasComponent } from './componentes/plantillas-ofertas/plantillas-ofertas.component';
import { PlantillasRequisitosXOfertasComponent } from './componentes/plantillas-requisitos-xofertas/plantillas-requisitos-xofertas.component';
import { PostuladosXOfertasComponent } from './componentes/postulados-xofertas/postulados-xofertas.component';
import { RequisitosComponent } from './componentes/requisitos/requisitos.component';
import { RequisitosXOfertasComponent } from './componentes/requisitos-xofertas/requisitos-xofertas.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { RolesXEmpresasComponent } from './componentes/roles-xempresas/roles-xempresas.component';
import { RolXUsuariosComponent } from './componentes/rol-xusuarios/rol-xusuarios.component';
import { RutasXVehiculosComponent } from './componentes/rutas-xvehiculos/rutas-xvehiculos.component';
import { SedesComponent } from './componentes/sedes/sedes.component';
import { SedesEmpleadosComponent } from './componentes/sedes-empleados/sedes-empleados.component';
import { TiposDeAccionesEnDestinoDeLaRutaComponent } from './componentes/tipos-de-acciones-en-destino-de-la-ruta/tipos-de-acciones-en-destino-de-la-ruta.component';
import { TiposDeArchivosAdjuntosComponent } from './componentes/tipos-de-archivos-adjuntos/tipos-de-archivos-adjuntos.component';
import { TiposDeCarroceriasComponent } from './componentes/tipos-de-carrocerias/tipos-de-carrocerias.component';
import { TiposDeDocumentosComponent } from './componentes/tipos-de-documentos/tipos-de-documentos.component';
import { TiposDeEmpresasComponent } from './componentes/tipos-de-empresas/tipos-de-empresas.component';
import { TiposDePersonasPorVehiculosComponent } from './componentes/tipos-de-personas-por-vehiculos/tipos-de-personas-por-vehiculos.component';
import { TiposDePuntosDeControlComponent } from './componentes/tipos-de-puntos-de-control/tipos-de-puntos-de-control.component';
import { TiposDeRequisitosComponent } from './componentes/tipos-de-requisitos/tipos-de-requisitos.component';
import { TiposDeRolesComponent } from './componentes/tipos-de-roles/tipos-de-roles.component';
import { TiposDeVehiculosComponent } from './componentes/tipos-de-vehiculos/tipos-de-vehiculos.component';
import { TiposOrientacionesDeLaOfertaComponent } from './componentes/tipos-orientaciones-de-la-oferta/tipos-orientaciones-de-la-oferta.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { VehiculosComponent } from './componentes/vehiculos/vehiculos.component';
import { VehiculosXEmpresasComponent } from './componentes/vehiculos-xempresas/vehiculos-xempresas.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    AccesosControlXPuntosComponent,
    LoginCallBackComponent,
    LoginComponent,
    AdjuntosComponent,
    CarroceriasXTiposDeVehiculosComponent,
    CiudadesComponent,
    ControlesXPuntosComponent,
    DepartamentosComponent,
    DesplazamientosXRutasXVehiculosComponent,
    DestinosComponent,
    DestinosXEmpresasComponent,
    DestinosXRutasXVehiculosComponent,
    EmpresasComponent,
    EstadosPorRutasComponent,
    MenusComponent,
    OfertasComponent,
    PaisesComponent,
    PersonasComponent,
    PersonasXVehiculosComponent,
    Plantillas_OfertasComponent,
    PlantillasRequisitosXOfertasComponent,
    PostuladosXOfertasComponent,
    RequisitosComponent,
    RequisitosXOfertasComponent,
    RolesComponent,
    RolesXEmpresasComponent,
    RolXUsuariosComponent,
    RutasXVehiculosComponent,
    SedesComponent,
    SedesEmpleadosComponent,
    TiposDeAccionesEnDestinoDeLaRutaComponent,
    TiposDeArchivosAdjuntosComponent,
    TiposDeCarroceriasComponent,
    TiposDeDocumentosComponent,
    TiposDeEmpresasComponent,
    TiposDePersonasPorVehiculosComponent,
    TiposDePuntosDeControlComponent,
    TiposDeRequisitosComponent,
    TiposDeRolesComponent,
    TiposDeVehiculosComponent,
    TiposOrientacionesDeLaOfertaComponent,
    UsuariosComponent,
    VehiculosComponent,
    VehiculosXEmpresasComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
