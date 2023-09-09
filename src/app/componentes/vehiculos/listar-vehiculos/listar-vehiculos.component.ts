import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculos , VehiculosComponent, VehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../../carrocerias-xtipos-de-vehiculos';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../../tipos-de-vehiculos';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
  styleUrls: ['./listar-vehiculos.component.css']
})

export class ListarVehiculosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstCarroceriasXTiposDeVehiculos : CarroceriasXTiposDeVehiculos[]=[];
      lstTiposDeCarrocerias : TiposDeCarrocerias[]=[];
      lstTiposDeVehiculos : TiposDeVehiculos[]=[];
      lstvehiculos:Vehiculos[]=[];
      lstvehiculosTodos:Vehiculos[]=[];
      dataSource!: MatTableDataSource<Vehiculos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idTipoDeVehiculo','idCarroceriaXTipoDeVehiculo', 'idTipoDeCarroceria' ,'placaVehiculo','placaTrailerVehiculo', 'editar', 'borrar'];
      public AbrirInformacion() 
      {
         this.vehiculosService.GetAll().subscribe({
           next : (datavehiculos:Vehiculos[]) => {
            this.lstvehiculosTodos = datavehiculos;
            this.lstvehiculos = datavehiculos;
            this.dataSource = new MatTableDataSource(datavehiculos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstvehiculos = this.lstvehiculosTodos.filter(
            (val) => (
              ((val.placaVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstvehiculos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstvehiculos.length;
        
      }
    
      ngOnInit() {
       // this.listarCarroceriasXTiposDeVehiculos();
        this.listarTiposDeCarrocerias();
        this.listarTiposDeVehiculos();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
     
  //    encontrarNombreCarroceriaXTipoDeVehiculo(idCarroceriaXTipoDeVehiculo:number):string{
  //      let carroceriaxtipodevehiculo:string="";
  //      this.lstCarroceriasXTiposDeVehiculos.forEach(element => {
  //        if(element.idCarroceriaXTipoDeVehiculo==idCarroceriaXTipoDeVehiculo){
  //          carroceriaxtipodevehiculo=element.nombreCarroceriaXTipoDeVehiculo;
  //        }
  //      });
  //      return carroceriaxtipodevehiculo;
  //    }
      
  //    listarCarroceriasXTiposDeVehiculos(){ 
  //      this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
  //        next : (lstcarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]) => { 
  //          this.lstCarroceriasXTiposDeVehiculos=lstcarroceriasxtiposdevehiculos;
  //        }
  //      });
  //    }

      encontrarNombreTipoDeCarroceria(idTipoDeCarroceria:number):string{
        let tipodecarroceria:string="";
        this.lstTiposDeCarrocerias.forEach(element => {
          if(element.idTipoDeCarroceria==idTipoDeCarroceria){
            tipodecarroceria=element.nombreTipoDeCarroceria;
          }
        });
        return tipodecarroceria;
      }

      listarTiposDeCarrocerias(){
        this.tiposdecarroceriasService.GetAll().subscribe({
          next : (lsttiposdecarrocerias:TiposDeCarrocerias[]) => {
            this.lstTiposDeCarrocerias=lsttiposdecarrocerias;
          }
        });
      }

      encontrarNombreTipoDeVehiculo(idTipoDeVehiculo:number):string{
        let tipodevehiculo:string="";
        this.lstTiposDeVehiculos.forEach(element => {
          if(element.idTipoDeVehiculo==idTipoDeVehiculo){
            tipodevehiculo=element.nombreTipoDeVehiculo;
          }
        });
        return tipodevehiculo;
      }

      listarTiposDeVehiculos(){
        this.tiposdevehiculosService.GetAll().subscribe({
          next : (lsttiposdevehiculos:TiposDeVehiculos[]) => {
            this.lstTiposDeVehiculos=lsttiposdevehiculos;
          }
        });
      }


    
      AbrirModalVehiculo(idVehiculo:number){
        const dialogRef = this.modalService.open(VehiculosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idVehiculo=idVehiculo;
        dialogRef.componentInstance.asignarid(idVehiculo);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idVehiculo:number){
        this.vehiculosService.delete(idVehiculo.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private vehiculosService: VehiculosService,
        private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
        private tiposdecarroceriasService: TiposDeCarroceriasService,
        private tiposdevehiculosService: TiposDeVehiculosService,
        private modalService: MatDialog
        ) { }
    }  