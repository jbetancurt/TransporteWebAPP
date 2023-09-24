import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeNotificaciones , TiposDeNotificacionesComponent, TiposDeNotificacionesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-tipos-de-notificaciones',
  templateUrl: './listar-tipos-de-notificaciones.component.html',
  styleUrls: ['./listar-tipos-de-notificaciones.component.scss']
})

  export class ListarTiposDeNotificacionesComponent implements OnInit {
    arraypaginator=environment.paginator;
    lsttiposdenotificaciones:TiposDeNotificaciones[]=[];
    lsttiposdenotificacionesTodos:TiposDeNotificaciones[]=[];
    dataSource!: MatTableDataSource<TiposDeNotificaciones>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdenotificacionesService.GetAll().subscribe({
         next : (datatiposdenotificaciones:TiposDeNotificaciones[]) => {
          this.lsttiposdenotificacionesTodos = datatiposdenotificaciones;
          this.lsttiposdenotificaciones = datatiposdenotificaciones;
          this.dataSource = new MatTableDataSource(datatiposdenotificaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lsttiposdenotificaciones = this.lsttiposdenotificacionesTodos.filter(
          (val) => (
            ((val.nombreTipoDeNotificacion ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lsttiposdenotificaciones);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lsttiposdenotificaciones.length;
      
    }
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalTipoDeNotificacion(idTipoDeNotificacion:number){
      const dialogRef = this.modalService.open(TiposDeNotificacionesComponent).updateSize('80%');
          
      dialogRef.componentInstance.idTipoDeNotificacion=idTipoDeNotificacion;
      dialogRef.componentInstance.asignarid(idTipoDeNotificacion);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDeNotificacion:number){
      this.tiposdenotificacionesService.delete(idTipoDeNotificacion.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdenotificacionesService: TiposDeNotificacionesService,
      private modalService: MatDialog) { }
  }  

