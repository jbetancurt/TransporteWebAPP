import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonasXVehiculos , PersonasXVehiculosComponent, PersonasXVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Vehiculos, VehiculosService } from '../../vehiculos';
import { Personas, PersonasService } from '../../personas';
import { TiposDePersonasPorVehiculos, TiposDePersonasPorVehiculosService } from '../../tipos-de-personas-por-vehiculos';


@Component({
  selector: 'app-listar-personas-xvehiculos',
  templateUrl: './listar-personas-xvehiculos.component.html',
  styleUrls: ['./listar-personas-xvehiculos.component.css']
})


export class ListarPersonasXVehiculosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstVehiculos : Vehiculos[]=[];
      lstPersonas : Personas[]=[];
      lstTiposDePersonasPorVehiculos : TiposDePersonasPorVehiculos[]=[];
      lstpersonasxvehiculos:PersonasXVehiculos[]=[];
      lstpersonasxvehiculosTodos:PersonasXVehiculos[]=[];
      dataSource!: MatTableDataSource<PersonasXVehiculos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idPersona' ,'idVehiculo','idTipoDePersonaPorVehiculo', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.personasxvehiculosService.GetAll().subscribe({
           next : (datapersonasxvehiculos:PersonasXVehiculos[]) => {
            this.lstpersonasxvehiculosTodos = datapersonasxvehiculos;
            this.lstpersonasxvehiculos = datapersonasxvehiculos;
            this.dataSource = new MatTableDataSource(datapersonasxvehiculos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
   //     this.lstpersonasxvehiculos = this.lstpersonasxvehiculosTodos.filter(
     //       (val) => (
     //         ((val.nombrePersonaXVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
    //    ));
        this.dataSource = new MatTableDataSource(this.lstpersonasxvehiculos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstpersonasxvehiculos.length;
        
      }
    
      ngOnInit() {
        this.listarVehiculos();
        this.listarPersonas();
        this.listarTiposDePersonasPorVehiculos();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
//      encontrarNombreVehiculo(idVehiculo:number):string{
 //       let vehiculo:string="";
  //      this.lstVehiculos.forEach(element => {
   //       if(element.idVehiculo==idVehiculo){
   //         vehiculo=element.nombreVehiculo;
   //       }
   //     });
  //      return vehiculo;
  //    }
      
      listarVehiculos(){ 
        this.vehiculosService.GetAll().subscribe({
          next : (lstvehiculos:Vehiculos[]) => { 
            this.lstVehiculos=lstvehiculos;
          }
        });
      }

      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
          }
        });
        return persona;
      }

      listarPersonas(){
        this.personasService.GetAll().subscribe({
          next : (lstpersonas:Personas[]) => {
            this.lstPersonas=lstpersonas;
          }
        });
      }

      encontrarNombreTipoDePersonaPorVehiculo(idTipoDePersonaPorVehiculo:number):string{
        let tipodepersonaporvehiculo:string="";
        this.lstTiposDePersonasPorVehiculos.forEach(element => {
          if(element.idTipoDePersonaPorVehiculo==idTipoDePersonaPorVehiculo){
            tipodepersonaporvehiculo=element.nombreTipoDePersonaPorVehiculo;
          }
        });
        return tipodepersonaporvehiculo;
      }

      listarTiposDePersonasPorVehiculos(){
        this.tiposdepersonasporvehiculosService.GetAll().subscribe({
          next : (lsttiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]) => {
            this.lstTiposDePersonasPorVehiculos=lsttiposdepersonasporvehiculos;
          }
        });
      }


    
      AbrirModalPersonaXVehiculo(idPersonaXVehiculo:number){
        const dialogRef = this.modalService.open(PersonasXVehiculosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idPersonaXVehiculo=idPersonaXVehiculo;
        dialogRef.componentInstance.asignarid(idPersonaXVehiculo);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idPersonaXVehiculo:number){
        this.personasxvehiculosService.delete(idPersonaXVehiculo.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private personasxvehiculosService: PersonasXVehiculosService,
        private vehiculosService: VehiculosService,
        private personasService: PersonasService,
        private tiposdepersonasporvehiculosService: TiposDePersonasPorVehiculosService,
        private modalService: MatDialog
        ) { }
    }  