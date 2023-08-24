import { Component, OnInit } from '@angular/core';
import { TiposDeDocumentos , TiposDeDocumentosComponent, TiposDeDocumentosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-listar-tipos-de-documentos',
  templateUrl: './listar-tipos-de-documentos.component.html',
  styleUrls: ['./listar-tipos-de-documentos.component.css']
})
export class ListarTiposDeDocumentosComponent implements OnInit {
  lsttiposdedocumentos:TiposDeDocumentos[]=[];
   
  displayedColumns: string[] = ['nombre','editar', 'borrar'];
  public AbrirInformacion()
  {
        
     this.tiposdedocumentosService.GetAll().subscribe({
       next : (datatiposdedocumentos:TiposDeDocumentos[]) => {
         this.lsttiposdedocumentos=datatiposdedocumentos;
       
        }
     });
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }
  

  AbrirModalTipoDocumento(idTipoDeDocumento:number){
    const dialogRef = this.modalService.open(TiposDeDocumentosComponent);
        
    dialogRef.componentInstance.idTipoDeDocumento=idTipoDeDocumento;
    dialogRef.componentInstance.asignarid(idTipoDeDocumento);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AbrirInformacion();
    });
   }

    borrarXId(idTipoDeDocumento:number){
    this.tiposdedocumentosService.delete(idTipoDeDocumento.toString()).subscribe({ 
      next:  () => {
         this.AbrirInformacion();
      }
    });
   }
  constructor(private tiposdedocumentosService: TiposDeDocumentosService,
    private modalService: MatDialog) { }
}
