import { Component, OnInit, ViewChild } from '@angular/core';
import { AccesosControlXPuntos , AccesosControlXPuntosComponent, AccesosControlXPuntosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { ControlesXPuntos, ControlesXPuntosService } from '../../controles-xpuntos';
import { Roles, RolesService } from '../../roles';


@Component({
  selector: 'app-listar-accesos-control-xpuntos',
  templateUrl: './listar-accesos-control-xpuntos.component.html',
  styleUrls: ['./listar-accesos-control-xpuntos.component.scss']
})

export class ListarAccesosControlXPuntosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstControlesXPuntos : ControlesXPuntos[]=[];
      lstRoles : Roles[]=[];
      lstaccesoscontrolxpuntos:AccesosControlXPuntos[]=[];
      lstaccesoscontrolxpuntosTodos:AccesosControlXPuntos[]=[];
      dataSource!: MatTableDataSource<AccesosControlXPuntos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresa','idRol', 'idControlXPunto','editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.accesoscontrolxpuntosService.GetAll().subscribe({
           next : (dataaccesoscontrolxpuntos:AccesosControlXPuntos[]) => {
            this.lstaccesoscontrolxpuntosTodos = dataaccesoscontrolxpuntos;
            this.lstaccesoscontrolxpuntos = dataaccesoscontrolxpuntos;
            this.dataSource = new MatTableDataSource(dataaccesoscontrolxpuntos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
     //   this.lstaccesoscontrolxpuntos = this.lstaccesoscontrolxpuntosTodos.filter(
     //       (val) => (
     //         ((val.nombreAccesoControlXPunto ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstaccesoscontrolxpuntos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstaccesoscontrolxpuntos.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.listarControlesXPuntos();
        this.listarRoles();
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

      encontrarNombreControlXPunto(idControlXPunto:number):string{
        let controlxpunto:string="";
        this.lstControlesXPuntos.forEach(element => {
          if(element.idControlXPunto==idControlXPunto){
            controlxpunto=element.nombreControlXPunto;
          }
        });
        return controlxpunto;
      }

      listarControlesXPuntos(){
        this.controlesxpuntosService.GetAll().subscribe({
          next : (lstcontrolesxpuntos:ControlesXPuntos[]) => {
            this.lstControlesXPuntos=lstcontrolesxpuntos;
          }
        });
      }

      encontrarNombreRol(idRol:number):string{
        let rol:string="";
        this.lstRoles.forEach(element => {
          if(element.idRol==idRol){
            rol=element.nombreRol;
          }
        });
        return rol;
      }

      listarRoles(){
        this.rolesService.GetAll().subscribe({
          next : (lstroles:Roles[]) => {
            this.lstRoles=lstroles;
          }
        });
      }


    
      AbrirModalAccesoControlXPunto(idAccesoControlXPunto:number){
        const dialogRef = this.modalService.open(AccesosControlXPuntosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idAccesoControlXPunto=idAccesoControlXPunto;
        dialogRef.componentInstance.asignarid(idAccesoControlXPunto);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idAccesoControlXPunto:number){
        this.accesoscontrolxpuntosService.delete(idAccesoControlXPunto.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private accesoscontrolxpuntosService: AccesosControlXPuntosService,
        private empresasService: EmpresasService,

        private controlesxpuntosService: ControlesXPuntosService,
        private rolesService: RolesService,
        private modalService: MatDialog
        ) { }
    }  