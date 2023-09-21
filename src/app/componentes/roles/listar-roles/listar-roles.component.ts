import { Component, OnInit, ViewChild } from '@angular/core';
  import { Roles , RolesComponent, RolesService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
import { TiposDeRoles, TiposDeRolesService } from '../../tipos-de-roles';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.scss']
})

    export class ListarRolesComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstTipoRoles : TiposDeRoles[]=[];
      lstroles:Roles[]=[];
      lstrolesTodos:Roles[]=[];
      dataSource!: MatTableDataSource<Roles>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre', 'tipoderol' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.rolesService.GetAll().subscribe({
           next : (dataroles:Roles[]) => {
            this.lstrolesTodos = dataroles;
            this.lstroles = dataroles;
            this.dataSource = new MatTableDataSource(dataroles);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstroles = this.lstrolesTodos.filter(
            (val) => (
              ((val.nombreRol ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstroles);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstroles.length;
        
      }
    
      ngOnInit() {
        this.listarTiposDeRoles();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreTipoRol(idTipoDeRol:number):string{
        let tipoRol:string="";
        this.lstTipoRoles.forEach(element => {
          if(element.idTipoDeRol==idTipoDeRol){
            tipoRol=element.nombreTipoDeRol;
          }
        });
        return tipoRol;
      }
      
      listarTiposDeRoles(){ 
        this.tiposDeRolesService.GetAll().subscribe({
          next : (lsttiposDeRoles:TiposDeRoles[]) => { 
            this.lstTipoRoles=lsttiposDeRoles;
          }
        });
      }
    
      AbrirModalRol(idRol:number){
        const dialogRef = this.modalService.open(RolesComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRol=idRol;
        dialogRef.componentInstance.asignarid(idRol);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRol:number){
        this.rolesService.delete(idRol.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private rolesService: RolesService,
        private tiposDeRolesService: TiposDeRolesService,
        private modalService: MatDialog
        ) { }
    }  