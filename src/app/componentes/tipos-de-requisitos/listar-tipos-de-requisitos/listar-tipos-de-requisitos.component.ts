import { Component, OnInit } from '@angular/core';
import { TiposDeRequisitos , TiposDeRequisitosComponent, TiposDeRequisitosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-tipos-de-requisitos',
  templateUrl: './listar-tipos-de-requisitos.component.html',
  styleUrls: ['./listar-tipos-de-requisitos.component.css']
})
  

export class ListarTiposDeRequisitosComponent implements OnInit {
  lsttiposderequisitos:TiposDeRequisitos[]=[];
   
  displayedColumns: string[] = ['nombre','editar', 'borrar'];
  public AbrirInformacion()
  {
        
     this.tiposderequisitosService.GetAll().subscribe({
       next : (datatiposderequisitos:TiposDeRequisitos[]) => {
         this.lsttiposderequisitos=datatiposderequisitos;
       
        }
     });
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }
  

  AbrirModalTipoDeRequisito(idTipoDeRequisito:number){
    const dialogRef = this.modalService.open(TiposDeRequisitosComponent);
        
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

