import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeRequisitos , TiposDeRequisitosComponent, TiposDeRequisitosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

 
@Component({
  selector: 'app-listar-tipos-de-requisitos',
  templateUrl: './listar-tipos-de-requisitos.component.html',
  styleUrls: ['./listar-tipos-de-requisitos.component.css']
})
  

export class ListarTiposDeRequisitosComponent implements OnInit {
  arraypaginator=environment.paginator;
  lsttiposderequisitos:TiposDeRequisitos[]=[];
  lsttiposderequisitosTodos:TiposDeRequisitos[]=[];
  dataSource!: MatTableDataSource<TiposDeRequisitos>;
  collectionSize = 0;
  filtroBusqueda: string = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['nombre','editar','borrar'];
  public AbrirInformacion()
  {
        
     this.tiposderequisitosService.GetAll().subscribe({
       next : (datatiposderequisitos:TiposDeRequisitos[]) => {
        this.lsttiposderequisitosTodos = datatiposderequisitos;
        this.lsttiposderequisitos = datatiposderequisitos;
        this.dataSource = new MatTableDataSource(datatiposderequisitos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }
     });
  }
  
  search(e: any): void {
    let value = (<HTMLTextAreaElement>e.target).value;
    
    this.lsttiposderequisitos = this.lsttiposderequisitosTodos.filter(
        (val) => (
          ((val.nombreTipoDeRequisito ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
    ));
    this.dataSource = new MatTableDataSource(this.lsttiposderequisitos);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
    this.collectionSize = this.lsttiposderequisitos.length;
    
  }
  
  

  ngOnInit() {
    this.AbrirInformacion();
    if (this.dataSource != null){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
           
  }
  

  AbrirModalTipoDeRequisito(idTipoDeRequisito:number){
    const dialogRef = this.modalService.open(TiposDeRequisitosComponent).updateSize('80%');
        
    dialogRef.componentInstance.idTipoDeRequisito=idTipoDeRequisito;
    dialogRef.componentInstance.asignarid(idTipoDeRequisito);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AbrirInformacion();
    });
   }

    borrarXId(idTipoDeRequisito:number){
    this.tiposderequisitosService.delete(idTipoDeRequisito.toString()).subscribe({ 
      next:  () => {
         this.AbrirInformacion();
      }
    });
   }
  constructor(private tiposderequisitosService: TiposDeRequisitosService,
    private modalService: MatDialog) { }
}

