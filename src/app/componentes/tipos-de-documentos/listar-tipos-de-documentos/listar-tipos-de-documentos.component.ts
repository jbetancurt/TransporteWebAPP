import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeDocumentos , TiposDeDocumentosComponent, TiposDeDocumentosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-listar-tipos-de-documentos',
  templateUrl: './listar-tipos-de-documentos.component.html',
  styleUrls: ['./listar-tipos-de-documentos.component.css']
})
  export class ListarTiposDeDocumentosComponent implements OnInit {
    arraypaginator=environment.paginator;
    lsttiposdedocumentos:TiposDeDocumentos[]=[];
    lsttiposdedocumentosTodos:TiposDeDocumentos[]=[];
    dataSource!: MatTableDataSource<TiposDeDocumentos>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdedocumentosService.GetAll().subscribe({
         next : (datatiposdedocumentos:TiposDeDocumentos[]) => {
          this.lsttiposdedocumentosTodos = datatiposdedocumentos;
          this.lsttiposdedocumentos = datatiposdedocumentos;
          this.dataSource = new MatTableDataSource(datatiposdedocumentos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lsttiposdedocumentos = this.lsttiposdedocumentosTodos.filter(
          (val) => (
            ((val.nombreTipoDeDocumento ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lsttiposdedocumentos);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lsttiposdedocumentos.length;
      
    }
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalTipoDeDocumento(idTipoDeDocumento:number){
      const dialogRef = this.modalService.open(TiposDeDocumentosComponent).updateSize('80%');
          
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
  