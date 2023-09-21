import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculosXEmpresas , VehiculosXEmpresasComponent, VehiculosXEmpresasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { Vehiculos, VehiculosService } from '../../vehiculos';
import { Ciudades, CiudadesService } from '../../ciudades';

@Component({
  selector: 'app-listar-vehiculos-xempresas',
  templateUrl: './listar-vehiculos-xempresas.component.html',
  styleUrls: ['./listar-vehiculos-xempresas.component.scss']
})

export class ListarVehiculosXEmpresasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstVehiculos : Vehiculos[]=[];
      
      lstvehiculosxempresas:VehiculosXEmpresas[]=[];
      lstvehiculosxempresasTodos:VehiculosXEmpresas[]=[];
      dataSource!: MatTableDataSource<VehiculosXEmpresas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresa','idVehiculo','editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.vehiculosxempresasService.GetAll().subscribe({
           next : (datavehiculosxempresas:VehiculosXEmpresas[]) => {
            this.lstvehiculosxempresasTodos = datavehiculosxempresas;
            this.lstvehiculosxempresas = datavehiculosxempresas;
            this.dataSource = new MatTableDataSource(datavehiculosxempresas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
      //  this.lstvehiculosxempresas = this.lstvehiculosxempresasTodos.filter(
      //      (val) => (
      //        ((val.nombreVehiculoXEmpresa ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      //  ));
        this.dataSource = new MatTableDataSource(this.lstvehiculosxempresas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstvehiculosxempresas.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.listarVehiculos();
        
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

      AbrirModalVehiculoXEmpresa(idVehiculoXEmpresa:number){
        const dialogRef = this.modalService.open(VehiculosXEmpresasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idVehiculoXEmpresa=idVehiculoXEmpresa;
        dialogRef.componentInstance.asignarid(idVehiculoXEmpresa);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idVehiculoXEmpresa:number){
        this.vehiculosxempresasService.delete(idVehiculoXEmpresa.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private vehiculosxempresasService: VehiculosXEmpresasService,
        private empresasService: EmpresasService,
        private vehiculosService: VehiculosService,
       
        private modalService: MatDialog
        ) { }
    }  