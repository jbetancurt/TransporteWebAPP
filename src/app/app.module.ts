import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { ReactiveFormsModule } from '@angular/forms';
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
import { ListarTiposDeDocumentosComponent } from './componentes/tipos-de-documentos/listar-tipos-de-documentos/listar-tipos-de-documentos.component';
import { ListarTiposDeEmpresasComponent } from './componentes/tipos-de-empresas/listar-tipos-de-empresas/listar-tipos-de-empresas.component';
import { ListarTiposDeAccionesEnDestinoDeLaRutaComponent } from './componentes/tipos-de-acciones-en-destino-de-la-ruta/listar-tipos-de-acciones-en-destino-de-la-ruta/listar-tipos-de-acciones-en-destino-de-la-ruta.component';
import { ListarTiposDeArchivosAdjuntosComponent } from './componentes/tipos-de-archivos-adjuntos/listar-tipos-de-archivos-adjuntos/listar-tipos-de-archivos-adjuntos.component';
import { ListarTiposDeCarroceriasComponent } from './componentes/tipos-de-carrocerias/listar-tipos-de-carrocerias/listar-tipos-de-carrocerias.component';
import { ListarTiposDePersonasPorVehiculosComponent } from './componentes/tipos-de-personas-por-vehiculos/listar-tipos-de-personas-por-vehiculos/listar-tipos-de-personas-por-vehiculos.component';
import { ListarTiposDePuntosDeControlComponent } from './componentes/tipos-de-puntos-de-control/listar-tipos-de-puntos-de-control/listar-tipos-de-puntos-de-control.component';
import { ListarTiposDeRequisitosComponent } from './componentes/tipos-de-requisitos/listar-tipos-de-requisitos/listar-tipos-de-requisitos.component';
import { ListarTiposDeRolesComponent } from './componentes/tipos-de-roles/listar-tipos-de-roles/listar-tipos-de-roles.component';
import { ListarTiposDeVehiculosComponent } from './componentes/tipos-de-vehiculos/listar-tipos-de-vehiculos/listar-tipos-de-vehiculos.component';
import { ListarTiposOrientacionesDeLaOfertaComponent } from './componentes/tipos-orientaciones-de-la-oferta/listar-tipos-orientaciones-de-la-oferta/listar-tipos-orientaciones-de-la-oferta.component';
import { ListarRolesComponent } from './componentes/roles/listar-roles/listar-roles.component';
import { ListarPaisesComponent } from './componentes/paises/listar-paises/listar-paises.component';
import { ListarDepartamentosComponent } from './componentes/departamentos/listar-departamentos/listar-departamentos.component';
import { ListarCiudadesComponent } from './componentes/ciudades/listar-ciudades/listar-ciudades.component';
import { ListarEstadosPorRutasComponent } from './componentes/estados-por-rutas/listar-estados-por-rutas/listar-estados-por-rutas.component';
import { ListarAdjuntosComponent } from './componentes/adjuntos/listar-adjuntos/listar-adjuntos.component';
import { ListarCarroceriasXTiposDeVehiculosComponent } from './componentes/carrocerias-xtipos-de-vehiculos/listar-carrocerias-xtipos-de-vehiculos/listar-carrocerias-xtipos-de-vehiculos.component';
import { ListarControlesXPuntosComponent } from './componentes/controles-xpuntos/listar-controles-xpuntos/listar-controles-xpuntos.component';
import { ListarDesplazamientosXRutasXVehiculosComponent } from './componentes/desplazamientos-xrutas-xvehiculos/listar-desplazamientos-xrutas-xvehiculos/listar-desplazamientos-xrutas-xvehiculos.component';
import { ListarDestinosComponent } from './componentes/destinos/listar-destinos/listar-destinos.component';
import { ListarEmpresasComponent } from './componentes/empresas/listar-empresas/listar-empresas.component';
import { ListarPersonasComponent } from './componentes/personas/listar-personas/listar-personas.component';
import { ListarRequisitosComponent } from './componentes/requisitos/listar-requisitos/listar-requisitos.component';
import { ListarRolXUsuariosComponent } from './componentes/rol-xusuarios/listar-rol-xusuarios/listar-rol-xusuarios.component';
import { ListarUsuariosComponent } from './componentes/usuarios/listar-usuarios/listar-usuarios.component';
import { ListarSedesComponent } from './componentes/sedes/listar-sedes/listar-sedes.component';
import { ListarVehiculosComponent } from './componentes/vehiculos/listar-vehiculos/listar-vehiculos.component';




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
    ListarTiposDeDocumentosComponent,
    ListarTiposDeEmpresasComponent,
    ListarTiposDeAccionesEnDestinoDeLaRutaComponent,
    ListarTiposDeArchivosAdjuntosComponent,
    ListarTiposDeCarroceriasComponent,
    ListarTiposDePersonasPorVehiculosComponent,
    ListarTiposDePuntosDeControlComponent,
    ListarTiposDeRequisitosComponent,
    ListarTiposDeRolesComponent,
    ListarTiposDeVehiculosComponent,
    ListarTiposOrientacionesDeLaOfertaComponent,
    ListarRolesComponent,
    ListarPaisesComponent,
    ListarDepartamentosComponent,
    ListarCiudadesComponent,
    ListarEstadosPorRutasComponent,
    ListarAdjuntosComponent,
    ListarCarroceriasXTiposDeVehiculosComponent,
    ListarControlesXPuntosComponent,
    ListarDesplazamientosXRutasXVehiculosComponent,
    ListarDestinosComponent,
    ListarEmpresasComponent,
    ListarPersonasComponent,
    ListarRequisitosComponent,
    ListarRolXUsuariosComponent,
    ListarUsuariosComponent,
    ListarSedesComponent,
    ListarVehiculosComponent
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
