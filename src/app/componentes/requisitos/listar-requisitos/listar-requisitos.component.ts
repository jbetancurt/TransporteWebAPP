import { Component, OnInit, ViewChild } from '@angular/core';
import { Requisitos , RequisitosComponent, RequisitosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';

@Component({
  selector: 'app-listar-requisitos',
  templateUrl: './listar-requisitos.component.html',
  styleUrls: ['./listar-requisitos.component.scss']
})


export class ListarRequisitosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstrequisitos:Requisitos[]=[];
      lstrequisitosTodos:Requisitos[]=[];
      dataSource!: MatTableDataSource<Requisitos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombrerequisito', 'idEmpresa' ,'requeridoRequisito','adjuntoRequisito','validacionUnicaRequisito', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.requisitosService.GetAll().subscribe({
           next : (datarequisitos:Requisitos[]) => {
            this.lstrequisitosTodos = datarequisitos;
            this.lstrequisitos = datarequisitos;
            this.dataSource = new MatTableDataSource(datarequisitos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstrequisitos = this.lstrequisitosTodos.filter(
            (val) => (
              ((val.nombreRequisito ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstrequisitos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstrequisitos.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreEmpresa(idEmpresa:number):string{
        let empresa:string="";
        this.lstEmpresas.forEach(element => {
          if(element.idEmpresa==idEmpresa){
            empresa=element.nombreEmpresa;
          }
        });
        return empresa;
      }
      
      listarEmpresas(){ 
        this.empresasService.GetAll().subscribe({
          next : (lstempresas:Empresas[]) => { 
            this.lstEmpresas=lstempresas;
          }
        });
      }
    
      AbrirModalRequisito(idRequisito:number){
        const dialogRef = this.modalService.open(RequisitosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRequisito=idRequisito;
        dialogRef.componentInstance.asignarid(idRequisito);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRequisito:number){
        this.requisitosService.delete(idRequisito.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private requisitosService: RequisitosService,
        private empresasService: EmpresasService,
        private modalService: MatDialog
        ) { }
    }  