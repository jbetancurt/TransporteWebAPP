import { Component, OnInit, ViewChild } from '@angular/core';
import { Adjuntos , AdjuntosComponent, AdjuntosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeArchivosAdjuntos, TiposDeArchivosAdjuntosService } from '../../tipos-de-archivos-adjuntos';

@Component({
  selector: 'app-listar-adjuntos',
  templateUrl: './listar-adjuntos.component.html',
  styleUrls: ['./listar-adjuntos.component.scss']
})

export class ListarAdjuntosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstTiposDeArchivosAdjuntos : TiposDeArchivosAdjuntos[]=[];
      lstadjuntos:Adjuntos[]=[];
      lstadjuntosTodos:Adjuntos[]=[];
      dataSource!: MatTableDataSource<Adjuntos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombreadjunto','nombrearchivoadjunto', 'idTipoDeArchivoAdjunto' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.adjuntosService.GetAll().subscribe({
           next : (dataadjuntos:Adjuntos[]) => {
            this.lstadjuntosTodos = dataadjuntos;
            this.lstadjuntos = dataadjuntos;
            this.dataSource = new MatTableDataSource(dataadjuntos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstadjuntos = this.lstadjuntosTodos.filter(
            (val) => (
              ((val.nombreAdjunto ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstadjuntos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstadjuntos.length;
        
      }
    
      ngOnInit() {
        this.listarTiposDeArchivosAdjuntos();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreTipoDeArchivoAdjunto(idTipoDeArchivoAdjunto:number):string{
        let tipodearchivoadjunto:string="";
        this.lstTiposDeArchivosAdjuntos.forEach(element => {
          if(element.idTipoDeArchivoAdjunto==idTipoDeArchivoAdjunto){
            tipodearchivoadjunto=element.nombreTipoDeArchivoAdjunto;
          }
        });
        return tipodearchivoadjunto;
      }
      
      listarTiposDeArchivosAdjuntos(){ 
        this.tiposdearchivosadjuntosService.GetAll().subscribe({
          next : (lsttiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]) => { 
            this.lstTiposDeArchivosAdjuntos=lsttiposdearchivosadjuntos;
          }
        });
      }
    
      AbrirModalAdjunto(idAdjunto:number){
        const dialogRef = this.modalService.open(AdjuntosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idAdjunto=idAdjunto;
        dialogRef.componentInstance.asignarid(idAdjunto);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idAdjunto:number){
        this.adjuntosService.delete(idAdjunto.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private adjuntosService: AdjuntosService,
        private tiposdearchivosadjuntosService: TiposDeArchivosAdjuntosService,
        private modalService: MatDialog
        ) { }
    }  