  import { Component, OnInit, ViewChild } from '@angular/core';
  import { TiposDeArchivosAdjuntos , TiposDeArchivosAdjuntosComponent, TiposDeArchivosAdjuntosService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  
  
  @Component({
    selector: 'app-listar-tipos-de-archivos-adjuntos',
    templateUrl: './listar-tipos-de-archivos-adjuntos.component.html',
    styleUrls: ['./listar-tipos-de-archivos-adjuntos.component.scss']
  })
  export class ListarTiposDeArchivosAdjuntosComponent implements OnInit {
    arraypaginator=environment.paginator;
    lsttiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]=[];
    lsttiposdearchivosadjuntosTodos:TiposDeArchivosAdjuntos[]=[];
    dataSource!: MatTableDataSource<TiposDeArchivosAdjuntos>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdearchivosadjuntosService.GetAll().subscribe({
         next : (datatiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]) => {
          this.lsttiposdearchivosadjuntosTodos = datatiposdearchivosadjuntos;
          this.lsttiposdearchivosadjuntos = datatiposdearchivosadjuntos;
          this.dataSource = new MatTableDataSource(datatiposdearchivosadjuntos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lsttiposdearchivosadjuntos = this.lsttiposdearchivosadjuntosTodos.filter(
          (val) => (
            ((val.nombreTipoDeArchivoAdjunto ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lsttiposdearchivosadjuntos);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lsttiposdearchivosadjuntos.length;
      
    }
      
    
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalTipoDeArchivoAdjunto(idTipoDeArchivoAdjunto:number){
      const dialogRef = this.modalService.open(TiposDeArchivosAdjuntosComponent).updateSize('80%');
          
      dialogRef.componentInstance.idTipoDeArchivoAdjunto=idTipoDeArchivoAdjunto;
      dialogRef.componentInstance.asignarid(idTipoDeArchivoAdjunto);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDeArchivoAdjunto:number){
      this.tiposdearchivosadjuntosService.delete(idTipoDeArchivoAdjunto.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdearchivosadjuntosService: TiposDeArchivosAdjuntosService,
      private modalService: MatDialog) { }
  }
  
  