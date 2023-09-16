import { Component, OnInit, ViewChild } from '@angular/core';
import { RutasXVehiculos , RutasXVehiculosComponent, RutasXVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { Vehiculos, VehiculosService } from '../../vehiculos';
import { EstadosPorRutas, EstadosPorRutasService } from '../../estados-por-rutas';

@Component({
  selector: 'app-listar-rutas-xvehiculos',
  templateUrl: './listar-rutas-xvehiculos.component.html',
  styleUrls: ['./listar-rutas-xvehiculos.component.css']
})

export class ListarRutasXVehiculosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstVehiculos : Vehiculos[]=[];
      lstEstadosPorRutas : EstadosPorRutas[]=[];
      lstrutasxvehiculos:RutasXVehiculos[]=[];
      lstrutasxvehiculosTodos:RutasXVehiculos[]=[];
      dataSource!: MatTableDataSource<RutasXVehiculos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresaLogistica','idEmpresaContratante','nombreRutaXVehiculo','idEstadoRuta', 'fechaInicioRutaXVehiculo' ,'fechaFinRutaXVehiculo','editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.rutasxvehiculosService.GetAll().subscribe({
           next : (datarutasxvehiculos:RutasXVehiculos[]) => {
            this.lstrutasxvehiculosTodos = datarutasxvehiculos;
            this.lstrutasxvehiculos = datarutasxvehiculos;
            this.dataSource = new MatTableDataSource(datarutasxvehiculos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstrutasxvehiculos = this.lstrutasxvehiculosTodos.filter(
            (val) => (
              ((val.nombreRutaXVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstrutasxvehiculos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstrutasxvehiculos.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.listarVehiculos();
        this.listarEstadosPorRutas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreEmpresa(idEmpresa:number):string{
        let empresa:string="";
        this.lstEmpresas.forEach(element => {
          if(element.idEmpresa==idEmpresa){
            empresa=element.nombreEmpresa;
          }
        });
        return empresa;
      }
      
      listarEmpresas(){ 
        this.empresasService.GetAll().subscribe({
          next : (lstempresas:Empresas[]) => { 
            this.lstEmpresas=lstempresas;
          }
        });
      }

      encontrarNombreVehiculo(idVehiculo:number):string{
        let vehiculo:string="";
        this.lstVehiculos.forEach(element => {
          if(element.idVehiculo==idVehiculo){
            vehiculo=element.placaVehiculo;
          }
        });
        return vehiculo;
      }

      listarVehiculos(){
        this.vehiculosService.GetAll().subscribe({
          next : (lstvehiculos:Vehiculos[]) => {
            this.lstVehiculos=lstvehiculos;
          }
        });
      }

      encontrarNombreEstadoPorRuta(idEstadoPorRuta:number):string{
        let estadoporruta:string="";
        this.lstEstadosPorRutas.forEach(element => {
          if(element.idEstadoPorRuta==idEstadoPorRuta){
            estadoporruta=element.nombreEstadoPorRuta;
          }
        });
        return estadoporruta;
      }

      listarEstadosPorRutas(){
        this.estadosporrutasService.GetAll().subscribe({
          next : (lstestadosporrutas:EstadosPorRutas[]) => {
            this.lstEstadosPorRutas=lstestadosporrutas;
          }
        });
      }


    
      AbrirModalRutaXVehiculo(idRutaXVehiculo:number){
        const dialogRef = this.modalService.open(RutasXVehiculosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRutaXVehiculo=idRutaXVehiculo;
        dialogRef.componentInstance.asignarid(idRutaXVehiculo);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRutaXVehiculo:number){
        this.rutasxvehiculosService.delete(idRutaXVehiculo.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private rutasxvehiculosService: RutasXVehiculosService,
        private empresasService: EmpresasService,
        private vehiculosService: VehiculosService,
        private estadosporrutasService: EstadosPorRutasService,
        private modalService: MatDialog
        ) { }
    }  