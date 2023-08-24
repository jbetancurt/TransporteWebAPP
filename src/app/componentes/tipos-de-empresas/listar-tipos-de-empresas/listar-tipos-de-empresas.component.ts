
  import { Component, OnInit } from '@angular/core';
  import { TiposDeEmpresas , TiposDeEmpresasComponent, TiposDeEmpresasService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { tap } from 'rxjs/operators';
  
  
  @Component({
    selector: 'app-listar-tipos-de-empresas',
    templateUrl: './listar-tipos-de-empresas.component.html',
    styleUrls: ['./listar-tipos-de-empresas.component.css']
  })
  export class ListarTiposDeEmpresasComponent implements OnInit {
    lsttiposdeempresas:TiposDeEmpresas[]=[];
     
    displayedColumns: string[] = ['nombre','editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdeempresasService.GetAll().subscribe({
         next : (datatiposdeempresas:TiposDeEmpresas[]) => {
           this.lsttiposdeempresas=datatiposdeempresas;
         
          }
       });
    }
  
    ngOnInit() {
      this.AbrirInformacion();
             
    }
    
  
    AbrirModalTipoEmpresa(idTipoDeEmpresa:number){
      const dialogRef = this.modalService.open(TiposDeEmpresasComponent);
          
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
  