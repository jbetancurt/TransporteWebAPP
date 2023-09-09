import { Component, OnInit, ViewChild } from '@angular/core';
import { CarroceriasXTiposDeVehiculos , CarroceriasXTiposDeVehiculosComponent, CarroceriasXTiposDeVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../../tipos-de-vehiculos';

@Component({
  selector: 'app-listar-carrocerias-xtipos-de-vehiculos',
  templateUrl: './listar-carrocerias-xtipos-de-vehiculos.component.html',
  styleUrls: ['./listar-carrocerias-xtipos-de-vehiculos.component.css']
})

export class ListarCarroceriasXTiposDeVehiculosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstTiposDeCarrocerias : TiposDeCarrocerias[]=[];
      lstTiposDeVehiculos : TiposDeVehiculos[]=[];
      lstcarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]=[];
      lstcarroceriasxtiposdevehiculosTodos:CarroceriasXTiposDeVehiculos[]=[];
      lstttiposdevehiculos:TiposDeVehiculos[]=[];
      lstttiposdevehiculosTodos:TiposDeVehiculos[]=[];
     // dataSource!: MatTableDataSource<CarroceriasXTiposDeVehiculos>;
      dataSource!: MatTableDataSource<CarroceriasXTiposDeVehiculos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['tipodevehiculo','tipodecarroceria', 'tienetrailer','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
           next : (datacarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]) => {
            this.lstcarroceriasxtiposdevehiculosTodos = datacarroceriasxtiposdevehiculos;
            this.lstcarroceriasxtiposdevehiculos = datacarroceriasxtiposdevehiculos;
            //this.dataSource = new MatTableDataSource(datacarroceriasxtiposdevehiculos);
            this.dataSource = new MatTableDataSource(datacarroceriasxtiposdevehiculos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstttiposdevehiculos = this.lstttiposdevehiculosTodos.filter(
            (val) => (
              ((val.nombreTipoDeVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstcarroceriasxtiposdevehiculos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstcarroceriasxtiposdevehiculos.length;
        
      }
    
      ngOnInit() {
        this.listarTiposDeCarrocerias();
        this.listarTiposDeVehiculos();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreTipoDeCarroceria(idTipoDeCarroceria:number):string{
        let tipodecarroceria:string="";
        //let tipodevehiculo : number=0;
        this.lstTiposDeCarrocerias.forEach(element => {
          if(element.idTipoDeCarroceria==idTipoDeCarroceria){
            tipodecarroceria=element.nombreTipoDeCarroceria;
            //tipodevehiculo=element.idTipoDeVehiculo;
          }
        });
        return tipodecarroceria;
      }

      encontrarNombreTipoDeVehiculo(idTipoDeVehiculo:number):string{
        let tipodevehiculo:string="";
        //let tipodecarroceria : number=0;
        this.lstTiposDeVehiculos.forEach(element => {
          if(element.idTipoDeVehiculo==idTipoDeVehiculo){
            tipodevehiculo=element.nombreTipoDeVehiculo;
            //tipodevehiculo=element.idTipoDeVehiculo;
          }
        });
        return tipodevehiculo;
      }

           
      
      listarTiposDeCarrocerias(){ 
        this.tiposdecarroceriasService.GetAll().subscribe({
          next : (lsttiposdevehiculos:TiposDeCarrocerias[]) => { 
            this.lstTiposDeCarrocerias=lsttiposdevehiculos;
          }
        });
      }
      
      listarTiposDeVehiculos(){ 
        this.tiposdevehiculosService.GetAll().subscribe({
          next : (lsttiposdevehiculos:TiposDeVehiculos[]) => { 
            this.lstTiposDeVehiculos=lsttiposdevehiculos;
          }
        });
      }
    
      AbrirModalCarroceriaXTipoDeVehiculo(idCarroceriaXTipoDeVehiculo:number){
        const dialogRef = this.modalService.open(CarroceriasXTiposDeVehiculosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idCarroceriaXTipoDeVehiculo=idCarroceriaXTipoDeVehiculo;
        dialogRef.componentInstance.asignarid(idCarroceriaXTipoDeVehiculo);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idCarroceriaXTipoDeVehiculo:number){
        this.carroceriasxtiposdevehiculosService.delete(idCarroceriaXTipoDeVehiculo.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
        private tiposdecarroceriasService: TiposDeCarroceriasService,
        private tiposdevehiculosService: TiposDeVehiculosService,
        private modalService: MatDialog
        ) { }
    }  