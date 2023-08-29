
  
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { TiposDeEmpresas , TiposDeEmpresasComponent, TiposDeEmpresasService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  
  
  @Component({
    selector: 'app-listar-tipos-de-empresas',
    templateUrl: './listar-tipos-de-empresas.component.html',
    styleUrls: ['./listar-tipos-de-empresas.component.css']
  })
    export class ListarTiposDeEmpresasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lsttiposdeempresas:TiposDeEmpresas[]=[];
      lsttiposdeempresasTodos:TiposDeEmpresas[]=[];
      dataSource!: MatTableDataSource<TiposDeEmpresas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.tiposdeempresasService.GetAll().subscribe({
           next : (datatiposdeempresas:TiposDeEmpresas[]) => {
            this.lsttiposdeempresasTodos = datatiposdeempresas;
            this.lsttiposdeempresas = datatiposdeempresas;
            this.dataSource = new MatTableDataSource(datatiposdeempresas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttiposdeempresas = this.lsttiposdeempresasTodos.filter(
            (val) => (
              ((val.nombreTipoDeEmpresa ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lsttiposdeempresas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lsttiposdeempresas.length;
        
      }
    
      ngOnInit() {
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
    
      AbrirModalTipoDeEmpresa(idTipoDeEmpresa:number){
        const dialogRef = this.modalService.open(TiposDeEmpresasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idTipoDeEmpresa=idTipoDeEmpresa;
        dialogRef.componentInstance.asignarid(idTipoDeEmpresa);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idTipoDeEmpresa:number){
        this.tiposdeempresasService.delete(idTipoDeEmpresa.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(private tiposdeempresasService: TiposDeEmpresasService,
        private modalService: MatDialog) { }
    }  
  
