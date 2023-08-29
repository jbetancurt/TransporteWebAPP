import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDePersonasPorVehiculos , TiposDePersonasPorVehiculosComponent, TiposDePersonasPorVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
    

@Component({
  selector: 'app-listar-tipos-de-personas-por-vehiculos',
  templateUrl: './listar-tipos-de-personas-por-vehiculos.component.html',
  styleUrls: ['./listar-tipos-de-personas-por-vehiculos.component.css']
})
 
export class ListarTiposDePersonasPorVehiculosComponent implements OnInit {
        arraypaginator=environment.paginator;
        lsttiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]=[];
        lsttiposdepersonasporvehiculosTodos:TiposDePersonasPorVehiculos[]=[];
        dataSource!: MatTableDataSource<TiposDePersonasPorVehiculos>;
        collectionSize = 0;
        filtroBusqueda: string = "";
        @ViewChild(MatPaginator) paginator!: MatPaginator;
        @ViewChild(MatSort) sort!: MatSort;
        
        displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
        public AbrirInformacion()
        {
              
           this.tiposdepersonasporvehiculosService.GetAll().subscribe({
             next : (datatiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]) => {
              this.lsttiposdepersonasporvehiculosTodos = datatiposdepersonasporvehiculos;
              this.lsttiposdepersonasporvehiculos = datatiposdepersonasporvehiculos;
              this.dataSource = new MatTableDataSource(datatiposdepersonasporvehiculos);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              }
           });
        }
        search(e: any): void {
          let value = (<HTMLTextAreaElement>e.target).value;
          
          this.lsttiposdepersonasporvehiculos = this.lsttiposdepersonasporvehiculosTodos.filter(
              (val) => (
                ((val.nombreTipoDePersonaPorVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
          ));
          this.dataSource = new MatTableDataSource(this.lsttiposdepersonasporvehiculos);
          
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          
          this.collectionSize = this.lsttiposdepersonasporvehiculos.length;
          
        }
      
        ngOnInit() {
          this.AbrirInformacion();
          if (this.dataSource != null){
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
                 
        }
        
      
        AbrirModalTipoDePersonaPorVehiculo(idTipoDePersonaPorVehiculo:number){
          const dialogRef = this.modalService.open(TiposDePersonasPorVehiculosComponent).updateSize('80%');
              
          dialogRef.componentInstance.idTipoDePersonaPorVehiculo=idTipoDePersonaPorVehiculo;
          dialogRef.componentInstance.asignarid(idTipoDePersonaPorVehiculo);
          dialogRef.componentInstance.onAdd.subscribe(() => {
            dialogRef.close();
          });
          dialogRef.afterClosed().subscribe(result => {
            this.AbrirInformacion();
          });
         }
      
          borrarXId(idTipoDePersonaPorVehiculo:number){
          this.tiposdepersonasporvehiculosService.delete(idTipoDePersonaPorVehiculo.toString()).subscribe({ 
            next:  () => {
               this.AbrirInformacion();
            }
          });
         }
        constructor(private tiposdepersonasporvehiculosService: TiposDePersonasPorVehiculosService,
          private modalService: MatDialog) { }
      }  
    