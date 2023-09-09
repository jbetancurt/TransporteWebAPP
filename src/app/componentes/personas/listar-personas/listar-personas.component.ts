import { Component, OnInit, ViewChild } from '@angular/core';
  import { Personas , PersonasComponent, PersonasService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
import { TiposDeDocumentos, TiposDeDocumentosService } from '../../tipos-de-documentos';

@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.css']
})

export class ListarPersonasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstTiposDeDocumentos : TiposDeDocumentos[]=[];
      lstpersonas:Personas[]=[];
      lstpersonasTodos:Personas[]=[];
      dataSource!: MatTableDataSource<Personas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombreCompletoPersona','idTipoDeDocumentoPersona', 'documentoDeIdentidadPersona' ,'correoPersona' ,'telefonoPersona','editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.personasService.GetAll().subscribe({
           next : (datapersonas:Personas[]) => {
            this.lstpersonasTodos = datapersonas;
            this.lstpersonas = datapersonas;
            this.dataSource = new MatTableDataSource(datapersonas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstpersonas = this.lstpersonasTodos.filter(
            (val) => (
              ((val.nombreCompletoPersona ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstpersonas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstpersonas.length;
        
      }
    
      ngOnInit() {
        this.listarTiposDeDocumentos();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreTipoDeDocumento(idTipoDeDocumento:number):string{
        let tipodedocumento:string="";
        this.lstTiposDeDocumentos.forEach(element => {
          if(element.idTipoDeDocumento==idTipoDeDocumento){
            tipodedocumento=element.nombreTipoDeDocumento;
          }
        });
        return tipodedocumento;
      }
      
      listarTiposDeDocumentos(){ 
        this.tiposdedocumentosService.GetAll().subscribe({
          next : (lsttiposdedocumentos:TiposDeDocumentos[]) => { 
            this.lstTiposDeDocumentos=lsttiposdedocumentos;
          }
        });
      }
    
      AbrirModalPersona(idPersona:number){
        const dialogRef = this.modalService.open(PersonasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idPersona=idPersona;
        dialogRef.componentInstance.asignarid(idPersona);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idPersona:number){
        this.personasService.delete(idPersona.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private personasService: PersonasService,
        private tiposdedocumentosService: TiposDeDocumentosService,
        private modalService: MatDialog
        ) { }
    }  