import { Component, OnInit, ViewChild } from '@angular/core';
import { RequisitosAdjuntos , RequisitosAdjuntosComponent, RequisitosAdjuntosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Adjuntos, AdjuntosService } from '../../adjuntos';
import { Requisitos, RequisitosService } from '../../requisitos';

@Component({
  selector: 'app-listar-requisitos-adjuntos',
  templateUrl: './listar-requisitos-adjuntos.component.html',
  styleUrls: ['./listar-requisitos-adjuntos.component.css']
})

export class ListarRequisitosAdjuntosComponent implements OnInit {
      arraypaginator=environment.paginator;
      
      lstAdjuntos : Adjuntos[]=[];
      lstRequisitos : Requisitos[]=[];
      lstrequisitosadjuntos:RequisitosAdjuntos[]=[];
      lstrequisitosadjuntosTodos:RequisitosAdjuntos[]=[];
      dataSource!: MatTableDataSource<RequisitosAdjuntos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idRequisito','idAdjunto', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.requisitosadjuntosService.GetAll().subscribe({
           next : (datarequisitosadjuntos:RequisitosAdjuntos[]) => {
            console.log(datarequisitosadjuntos);
            this.lstrequisitosadjuntosTodos = datarequisitosadjuntos;
            this.lstrequisitosadjuntos = datarequisitosadjuntos;
            this.dataSource = new MatTableDataSource(datarequisitosadjuntos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(datarequisitosadjuntos);
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
     ///   this.lstrequisitosadjuntos = this.lstrequisitosadjuntosTodos.filter(
     //       (val) => (
     //         ((val.nombreRequisitoAdjunto ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstrequisitosadjuntos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstrequisitosadjuntos.length;
        
      }
    
      ngOnInit() {
        
        this.listarAdjuntos();
        this.listarRequisitos();
        this.AbrirInformacion();
        
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
      
      

      encontrarNombreAdjunto(idAdjunto:number):string{
        let adjunto:string="";
        this.lstAdjuntos.forEach(element => {
          if(element.idAdjunto==idAdjunto){
            adjunto=element.nombreAdjunto;
          }
        });
        return adjunto;
      }

      listarAdjuntos(){
        this.adjuntosService.GetAll().subscribe({
          next : (lstadjuntos:Adjuntos[]) => {
            this.lstAdjuntos=lstadjuntos;
          }
        });
      }

      encontrarNombreRequisito(idRequisito:number):string{
        let requisito:string="";
        this.lstRequisitos.forEach(element => {
          if(element.idRequisito==idRequisito){
            requisito=element.nombreRequisito;
          }
        });
        return requisito;
      }

      listarRequisitos(){
        this.requisitosService.GetAll().subscribe({
          next : (lstrequisitos:Requisitos[]) => {
            this.lstRequisitos=lstrequisitos;
          }
        });
      }


    
      AbrirModalRequisitoAdjunto(idRequisitoAdjunto:number){
        const dialogRef = this.modalService.open(RequisitosAdjuntosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRequisitoAdjunto=idRequisitoAdjunto;
        dialogRef.componentInstance.asignarid(idRequisitoAdjunto);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRequisitoAdjunto:number){
        this.requisitosadjuntosService.delete(idRequisitoAdjunto.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private requisitosadjuntosService: RequisitosAdjuntosService,
       
        private adjuntosService: AdjuntosService,
        private requisitosService: RequisitosService,
        private modalService: MatDialog
        ) { }
    }  