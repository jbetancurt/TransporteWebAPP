import { Component, OnInit, ViewChild } from '@angular/core';
import { DestinosXRutasXVehiculos , DestinosXRutasXVehiculosComponent, DestinosXRutasXVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RutasXVehiculos, RutasXVehiculosService } from '../../rutas-xvehiculos';
import { TiposDeAccionesEnDestinoDeLaRuta, TiposDeAccionesEnDestinoDeLaRutaService } from '../../tipos-de-acciones-en-destino-de-la-ruta';
import { Ciudades, CiudadesService } from '../../ciudades';

@Component({
  selector: 'app-listar-destinos-xrutas-xvehiculos',
  templateUrl: './listar-destinos-xrutas-xvehiculos.component.html',
  styleUrls: ['./listar-destinos-xrutas-xvehiculos.component.scss']
})


export class ListarDestinosXRutasXVehiculosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstRutasXVehiculos : RutasXVehiculos[]=[];
      lstTiposDeAccionesEnDestinoDeLaRuta : TiposDeAccionesEnDestinoDeLaRuta[]=[];
      lstCiudades : Ciudades[]=[];
      lstdestinosxrutasxvehiculos:DestinosXRutasXVehiculos[]=[];
      lstdestinosxrutasxvehiculosTodos:DestinosXRutasXVehiculos[]=[];
      dataSource!: MatTableDataSource<DestinosXRutasXVehiculos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idRutaXVehiculo','idTipoDeAccionDestinoXRutaXVehiculo','idCiudad', 'fechaDestinoXRutaXVehiculo','ordenDestinoXRutaXVehiculo','telefonoDestinoXRutaXVehiculo','direccionDestinoXRutaXVehiculo', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.destinosxrutasxvehiculosService.GetAll().subscribe({
           next : (datadestinosxrutasxvehiculos:DestinosXRutasXVehiculos[]) => {
            this.lstdestinosxrutasxvehiculosTodos = datadestinosxrutasxvehiculos;
            this.lstdestinosxrutasxvehiculos = datadestinosxrutasxvehiculos;
            this.dataSource = new MatTableDataSource(datadestinosxrutasxvehiculos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
     ///   this.lstdestinosxrutasxvehiculos = this.lstdestinosxrutasxvehiculosTodos.filter(
     //       (val) => (
     //         ((val.nombreDestinoXRutaXVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstdestinosxrutasxvehiculos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstdestinosxrutasxvehiculos.length;
        
      }
    
      ngOnInit() {
        this.listarRutasXVehiculos();
        this.listarTiposDeAccionesEnDestinoDeLaRuta();
        this.listarCiudades();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreRutaXVehiculo(idRutaXVehiculo:number):string{
        let rutaxvehiculo:string="";
        this.lstRutasXVehiculos.forEach(element => {
          if(element.idRutaXVehiculo==idRutaXVehiculo){
            rutaxvehiculo=element.nombreRutaXVehiculo;
          }
        });
        return rutaxvehiculo;
      }
      
      listarRutasXVehiculos(){ 
        this.rutasxvehiculosService.GetAll().subscribe({
          next : (lstrutasxvehiculos:RutasXVehiculos[]) => { 
            this.lstRutasXVehiculos=lstrutasxvehiculos;
          }
        });
      }

      encontrarNombreTipoDeAccionEnDestinoDeLaRuta(idTipoDeAccionEnDestinoDeLaRuta:number):string{
        let tipodeaccionendestinodelaruta:string="";
        this.lstTiposDeAccionesEnDestinoDeLaRuta.forEach(element => {
          if(element.idTipoDeAccionEnDestinoDeLaRuta==idTipoDeAccionEnDestinoDeLaRuta){
            tipodeaccionendestinodelaruta=element.nombreTipoDeAccionEnDestinoDeLaRuta;
          }
        });
        return tipodeaccionendestinodelaruta;
      }

      listarTiposDeAccionesEnDestinoDeLaRuta(){
        this.tiposdeaccionesendestinodelarutaService.GetAll().subscribe({
          next : (lsttiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]) => {
            this.lstTiposDeAccionesEnDestinoDeLaRuta=lsttiposdeaccionesendestinodelaruta;
          }
        });
      }

      encontrarNombreCiudad(idCiudad:number):string{
        let ciudad:string="";
        this.lstCiudades.forEach(element => {
          if(element.idCiudad==idCiudad){
            ciudad=element.nombreCiudad;
          }
        });
        return ciudad;
      }

      listarCiudades(){
        this.ciudadesService.GetAll().subscribe({
          next : (lstciudades:Ciudades[]) => {
            this.lstCiudades=lstciudades;
          }
        });
      }


    
      AbrirModalDestinoXRutaXVehiculo(idDestinoXRutaXVehiculo:number){
        const dialogRef = this.modalService.open(DestinosXRutasXVehiculosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idDestinoXRutaXVehiculo=idDestinoXRutaXVehiculo;
        dialogRef.componentInstance.asignarid(idDestinoXRutaXVehiculo);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idDestinoXRutaXVehiculo:number){
        this.destinosxrutasxvehiculosService.delete(idDestinoXRutaXVehiculo.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private destinosxrutasxvehiculosService: DestinosXRutasXVehiculosService,
        private rutasxvehiculosService: RutasXVehiculosService,
        private tiposdeaccionesendestinodelarutaService: TiposDeAccionesEnDestinoDeLaRutaService,
        private ciudadesService: CiudadesService,
        private modalService: MatDialog
        ) { }
    }  