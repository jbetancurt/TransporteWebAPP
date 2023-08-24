import { Component, OnInit } from '@angular/core';
import { TiposDeRoles , TiposDeRolesComponent, TiposDeRolesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-listar-tipos-de-roles',
  templateUrl: './listar-tipos-de-roles.component.html',
  styleUrls: ['./listar-tipos-de-roles.component.css']
})
export class ListarTiposDeRolesComponent implements OnInit {
  lsttiposderoles:TiposDeRoles[]=[];
   
  displayedColumns: string[] = ['nombre','editar', 'borrar'];
  public AbrirInformacion()
  {
        
     this.tiposderolesService.GetAll().subscribe({
       next : (datatiposderoles:TiposDeRoles[]) => {
         this.lsttiposderoles=datatiposderoles;
       
        }
     });
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }
  

  AbrirModalTipoDeRol(idTipoDeRol:number){
    const dialogRef = this.modalService.open(TiposDeRolesComponent);
        
    dialogRef.componentInstance.idTipoDeRol=idTipoDeRol;
    dialogRef.componentInstance.asignarid(idTipoDeRol);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AbrirInformacion();
    });
   }

    borrarXId(idTipoDeRol:number){
    this.tiposderolesService.delete(idTipoDeRol.toString()).subscribe({ 
      next:  () => {
         this.AbrirInformacion();
      }
    });
   }
  constructor(private tiposderolesService: TiposDeRolesService,
    private modalService: MatDialog) { }
}
