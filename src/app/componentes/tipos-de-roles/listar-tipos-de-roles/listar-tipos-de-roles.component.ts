import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeRoles , TiposDeRolesComponent, TiposDeRolesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listar-tipos-de-roles',
  templateUrl: './listar-tipos-de-roles.component.html',
  styleUrls: ['./listar-tipos-de-roles.component.css']
})

export class ListarTiposDeRolesComponent implements OnInit {
  arraypaginator=environment.paginator;
  lsttiposderoles:TiposDeRoles[]=[];
  lsttiposderolesTodos:TiposDeRoles[]=[];
  dataSource!: MatTableDataSource<TiposDeRoles>;
  collectionSize = 0;
  filtroBusqueda: string = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['nombre','editar','borrar'];
  public AbrirInformacion()
  {
        
     this.tiposderolesService.GetAll().subscribe({
       next : (datatiposderoles:TiposDeRoles[]) => {
        this.lsttiposderolesTodos = datatiposderoles;
        this.lsttiposderoles = datatiposderoles;
        this.dataSource = new MatTableDataSource(datatiposderoles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }
     });
  }
  
  search(e: any): void {
    let value = (<HTMLTextAreaElement>e.target).value;
    
    this.lsttiposderoles = this.lsttiposderolesTodos.filter(
        (val) => (
          ((val.nombreTipoDeRol ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
    ));
    this.dataSource = new MatTableDataSource(this.lsttiposderoles);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
    this.collectionSize = this.lsttiposderoles.length;
    
  }
  
  

  ngOnInit() {
    this.AbrirInformacion();
    if (this.dataSource != null){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
           
  }
  

  AbrirModalTipoDeRol(idTipoDeRol:number){
    const dialogRef = this.modalService.open(TiposDeRolesComponent).updateSize('80%');
        
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


