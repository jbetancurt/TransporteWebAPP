import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeVehiculos , TiposDeVehiculosComponent, TiposDeVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-tipos-de-vehiculos',
  templateUrl: './listar-tipos-de-vehiculos.component.html',
  styleUrls: ['./listar-tipos-de-vehiculos.component.scss']
})

  
  export class ListarTiposDeVehiculosComponent implements OnInit {
    arraypaginator=environment.paginator;
    lsttiposdevehiculos:TiposDeVehiculos[]=[];
    lsttiposdevehiculosTodos:TiposDeVehiculos[]=[];
    dataSource!: MatTableDataSource<TiposDeVehiculos>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre','editar','borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdevehiculosService.GetAll().subscribe({
         next : (datatiposdevehiculos:TiposDeVehiculos[]) => {
          this.lsttiposdevehiculosTodos = datatiposdevehiculos;
          this.lsttiposdevehiculos = datatiposdevehiculos;
          this.dataSource = new MatTableDataSource(datatiposdevehiculos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lsttiposdevehiculos = this.lsttiposdevehiculosTodos.filter(
          (val) => (
            ((val.nombreTipoDeVehiculo ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lsttiposdevehiculos);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lsttiposdevehiculos.length;
      
    }
    
    
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalTipoDeVehiculo(idTipoDeVehiculo:number){
      const dialogRef = this.modalService.open(TiposDeVehiculosComponent).updateSize('80%');
          
      dialogRef.componentInstance.idTipoDeVehiculo=idTipoDeVehiculo;
      dialogRef.componentInstance.asignarid(idTipoDeVehiculo);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDeVehiculo:number){
      this.tiposdevehiculosService.delete(idTipoDeVehiculo.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdevehiculosService: TiposDeVehiculosService,
      private modalService: MatDialog) { }
  }
  
