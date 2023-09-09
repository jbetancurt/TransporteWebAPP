import { Component, OnInit, ViewChild } from '@angular/core';
import { RolXUsuarios , RolXUsuariosComponent, RolXUsuariosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Roles, RolesService } from '../../roles';
import { Usuarios, UsuariosService } from '../../usuarios';

@Component({
  selector: 'app-listar-rol-xusuarios',
  templateUrl: './listar-rol-xusuarios.component.html',
  styleUrls: ['./listar-rol-xusuarios.component.css']
})

export class ListarRolXUsuariosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstRoles : Roles[]=[];
      lstUsuarios : Usuarios[]=[];
      lstrolxusuarios:RolXUsuarios[]=[];
      lstrolxusuariosTodos:RolXUsuarios[]=[];
      dataSource!: MatTableDataSource<RolXUsuarios>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idRol','idUsuario', 'activo' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.rolxusuariosService.GetAll().subscribe({
           next : (datarolxusuarios:RolXUsuarios[]) => {
            this.lstrolxusuariosTodos = datarolxusuarios;
            this.lstrolxusuarios = datarolxusuarios;
            this.dataSource = new MatTableDataSource(datarolxusuarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
       // this.lstrolxusuarios = this.lstrolxusuariosTodos.filter(
        //    (val) => (
        //      ((val.nombreRolXUsuario ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
       // ));
        this.dataSource = new MatTableDataSource(this.lstrolxusuarios);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstrolxusuarios.length;
        
      }
    
      ngOnInit() {
        this.listarRoles();
        this.listarUsuarios();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
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

      encontrarNombreUsuario(idUsuario:number):string{
        let usuario:string="";
        this.lstUsuarios.forEach(element => {
          if(element.idUsuario==idUsuario){
            usuario=element.nombreUsuario;
          }
        });
        return usuario;
      }

      listarUsuarios(){
        this.usuariosService.GetAll().subscribe({
          next : (lstusuarios:Usuarios[]) => {
            this.lstUsuarios=lstusuarios;
          }
        });
      }

    
      AbrirModalRolXUsuario(idRolXUsuario:number){
        const dialogRef = this.modalService.open(RolXUsuariosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRolXUsuario=idRolXUsuario;
        dialogRef.componentInstance.asignarid(idRolXUsuario);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRolXUsuario:number){
        this.rolxusuariosService.delete(idRolXUsuario.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private rolxusuariosService: RolXUsuariosService,
        private rolesService: RolesService,
        private usuariosService: UsuariosService,
        private modalService: MatDialog
        ) { }
    }  