import { Component, OnInit, ViewChild } from '@angular/core';
import { DesplazamientosXRutasXVehiculos , DesplazamientosXRutasXVehiculosComponent, DesplazamientosXRutasXVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RutasXVehiculos, RutasXVehiculosService } from '../../rutas-xvehiculos';


@Component({
  selector: 'app-listar-desplazamientos-xrutas-xvehiculos',
  templateUrl: './listar-desplazamientos-xrutas-xvehiculos.component.html',
  styleUrls: ['./listar-desplazamientos-xrutas-xvehiculos.component.css']
})

export class ListarDesplazamientosXRutasXVehiculosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstRutasXVehiculos : RutasXVehiculos[]=[];
      lstdesplazamientosxrutasxvehiculos:DesplazamientosXRutasXVehiculos[]=[];
      lstdesplazamientosxrutasxvehiculosTodos:DesplazamientosXRutasXVehiculos[]=[];
      dataSource!: MatTableDataSource<DesplazamientosXRutasXVehiculos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idRutaXVehiculo','fechadesplazamientoxrutaxvehiculo', 'horadesplazamientoxrutaxvehiculo' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.desplazamientosxrutasxvehiculosService.GetAll().subscribe({
           next : (datadesplazamientosxrutasxvehiculos:DesplazamientosXRutasXVehiculos[]) => {
            this.lstdesplazamientosxrutasxvehiculosTodos = datadesplazamientosxrutasxvehiculos;
            this.lstdesplazamientosxrutasxvehiculos = datadesplazamientosxrutasxvehiculos;
            this.dataSource = new MatTableDataSource(datadesplazamientosxrutasxvehiculos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstdesplazamientosxrutasxvehiculos = this.lstdesplazamientosxrutasxvehiculosTodos.filter(
            (val) => val.idRutaXVehiculo.toString().includes(value));
        this.dataSource = new MatTableDataSource(this.lstdesplazamientosxrutasxvehiculos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstdesplazamientosxrutasxvehiculos.length;
        
      }
    
      ngOnInit() {
        this.listarRutasXVehiculos();
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
    
      AbrirModalDesplazamientoXRutaXVehiculo(idDesplazamientoXRutaXVehiculo:number){
        const dialogRef = this.modalService.open(DesplazamientosXRutasXVehiculosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idDesplazamientoXRutaXVehiculo=idDesplazamientoXRutaXVehiculo;
        dialogRef.componentInstance.asignarid(idDesplazamientoXRutaXVehiculo);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idDesplazamientoXRutaXVehiculo:number){
        this.desplazamientosxrutasxvehiculosService.delete(idDesplazamientoXRutaXVehiculo.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private desplazamientosxrutasxvehiculosService: DesplazamientosXRutasXVehiculosService,
        private rutasxvehiculosService: RutasXVehiculosService,
        private modalService: MatDialog
        ) { }
    }  