import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadosDeLasNotificaciones , EstadosDeLasNotificacionesComponent, EstadosDeLasNotificacionesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-estados-de-las-notificaciones',
  templateUrl: './listar-estados-de-las-notificaciones.component.html',
  styleUrls: ['./listar-estados-de-las-notificaciones.component.scss']
})

  export class ListarEstadosDeLasNotificacionesComponent implements OnInit {
    arraypaginator=environment.paginator;
    lstestadosdelasnotificaciones:EstadosDeLasNotificaciones[]=[];
    lstestadosdelasnotificacionesTodos:EstadosDeLasNotificaciones[]=[];
    dataSource!: MatTableDataSource<EstadosDeLasNotificaciones>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.estadosdelasnotificacionesService.GetAll().subscribe({
         next : (dataestadosdelasnotificaciones:EstadosDeLasNotificaciones[]) => {
          this.lstestadosdelasnotificacionesTodos = dataestadosdelasnotificaciones;
          this.lstestadosdelasnotificaciones = dataestadosdelasnotificaciones;
          this.dataSource = new MatTableDataSource(dataestadosdelasnotificaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lstestadosdelasnotificaciones = this.lstestadosdelasnotificacionesTodos.filter(
          (val) => (
            ((val.nombreEstadoDeLaNotificacion ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lstestadosdelasnotificaciones);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lstestadosdelasnotificaciones.length;
      
    }
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalEstadoDeLaNotificacion(idEstadoDeLaNotificacion:number){
      const dialogRef = this.modalService.open(EstadosDeLasNotificacionesComponent).updateSize('80%');
          
      dialogRef.componentInstance.idEstadoDeLaNotificacion=idEstadoDeLaNotificacion;
      dialogRef.componentInstance.asignarid(idEstadoDeLaNotificacion);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idEstadoDeLaNotificacion:number){
      this.estadosdelasnotificacionesService.delete(idEstadoDeLaNotificacion.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private estadosdelasnotificacionesService: EstadosDeLasNotificacionesService,
      private modalService: MatDialog) { }
  }  
