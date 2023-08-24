import { Component, OnInit } from '@angular/core';
  import { TiposDeArchivosAdjuntos , TiposDeArchivosAdjuntosComponent, TiposDeArchivosAdjuntosService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { tap } from 'rxjs/operators';
  
  
  @Component({
    selector: 'app-tipos-de-archivos-adjuntos',
    templateUrl: './listar-tipos-de-archivos-adjuntos.component.html',
    styleUrls: ['./listar-tipos-de-archivos-adjuntos.component.css']
  })
  export class ListarTiposDeArchivosAdjuntosComponent implements OnInit {
    lsttiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]=[];
     
    displayedColumns: string[] = ['nombre','editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdearchivosadjuntosService.GetAll().subscribe({
         next : (datatiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]) => {
           this.lsttiposdearchivosadjuntos=datatiposdearchivosadjuntos;
         
          }
       });
    }
  
    ngOnInit() {
      this.AbrirInformacion();
             
    }
    
  
    AbrirModalTiposDeArchicosAdjuntos(idTipoDeArchivoAdjunto:number){
      const dialogRef = this.modalService.open(TiposDeArchivosAdjuntosComponent);
          
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
  
