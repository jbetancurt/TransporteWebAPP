import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesXEmpresas , RolesXEmpresasComponent, RolesXEmpresasService} from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Roles, RolesService } from '../../roles';
import { Empresas, EmpresasService } from '../../empresas';

@Component({
  selector: 'app-listar-roles-xempresas',
  templateUrl: './listar-roles-xempresas.component.html',
  styleUrls: ['./listar-roles-xempresas.component.scss']
})
export class ListarRolesXEmpresasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstRoles : Roles[]=[];
      lstEmpresas : Empresas[]=[];
     
      lstrolesxempresas:RolesXEmpresas[]=[];
      lstrolesxempresasTodos:RolesXEmpresas[]=[];
      dataSource!: MatTableDataSource<RolesXEmpresas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresa','idRol','activo', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.rolesxempresasServices.GetAll().subscribe({
           next : (datarolesxempresas:RolesXEmpresas[]) => {
            this.lstrolesxempresasTodos = datarolesxempresas;
            this.lstrolesxempresas = datarolesxempresas;
            this.dataSource = new MatTableDataSource(datarolesxempresas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
      //  this.lstrolesxempresas = this.lstrolesxempresasTodos.filter(
      //     (val) => (
     //        ((val.tituloPlantillaRolXEmpresa ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstrolesxempresas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstrolesxempresas.length;
        
      }
    
      ngOnInit() {
        this.listarRoles();
        this.listarEmpresas();
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

      


    
      AbrirModalRolXEmpresa(idRolXEmpresa:number){
        const dialogRef = this.modalService.open(RolesXEmpresasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRolXEmpresa=idRolXEmpresa;
        dialogRef.componentInstance.asignarid(idRolXEmpresa);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRolXEmpresa:number){
        this.rolesxempresasServices.delete(idRolXEmpresa.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private rolesxempresasServices: RolesXEmpresasService,
        private rolesService: RolesService,
        private empresasService: EmpresasService,
        private modalService: MatDialog
        ) { }
    }  