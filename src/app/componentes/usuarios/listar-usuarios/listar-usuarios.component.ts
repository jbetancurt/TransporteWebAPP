import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios , UsuariosComponent, UsuariosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})

export class ListarUsuariosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstusuarios:Usuarios[]=[];
      lstusuariosTodos:Usuarios[]=[];
      dataSource!: MatTableDataSource<Usuarios>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idPersona','nombreUsuario', 'claveUsuario' , 'estadoUsuario','editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.usuariosService.GetAll().subscribe({
           next : (datausuarios:Usuarios[]) => {
            this.lstusuariosTodos = datausuarios;
            this.lstusuarios = datausuarios;
            this.dataSource = new MatTableDataSource(datausuarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstusuarios = this.lstusuariosTodos.filter(
            (val) => (
              ((val.nombreUsuario ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstusuarios);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstusuarios.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
          }
        });
        return persona;
      }
      
      listarPersonas(){ 
        this.personasService.GetAll().subscribe({
          next : (lstpersonas:Personas[]) => { 
            this.lstPersonas=lstpersonas;
          }
        });
      }
    
      AbrirModalUsuario(idUsuario:number){
        const dialogRef = this.modalService.open(UsuariosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idUsuario=idUsuario;
        dialogRef.componentInstance.asignarid(idUsuario);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idUsuario:number){
        this.usuariosService.delete(idUsuario.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private usuariosService: UsuariosService,
        private personasService: PersonasService,
        private modalService: MatDialog
        ) { }
    }  