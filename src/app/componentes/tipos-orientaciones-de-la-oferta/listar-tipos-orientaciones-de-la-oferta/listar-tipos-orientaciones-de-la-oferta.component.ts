import { Component, OnInit } from '@angular/core';
import { TiposOrientacionesDeLaOferta , TiposOrientacionesDeLaOfertaComponent, TiposOrientacionesDeLaOfertaService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-tipos-orientaciones-de-la-oferta',
  templateUrl: './listar-tipos-orientaciones-de-la-oferta.component.html',
  styleUrls: ['./listar-tipos-orientaciones-de-la-oferta.component.css']
})

export class ListarTiposOrientacionesDeLaOfertaComponent implements OnInit {
  lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]=[];
   
  displayedColumns: string[] = ['nombre','editar', 'borrar'];
  public AbrirInformacion()
  {
        
     this.tiposorientacionesdelaofertaService.GetAll().subscribe({
       next : (datatiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => {
         this.lsttiposorientacionesdelaoferta=datatiposorientacionesdelaoferta;
       
        }
     });
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }
  

  AbrirModalTipoOrientacionOferta(idTipoOrientacionOferta:number){
    const dialogRef = this.modalService.open(TiposOrientacionesDeLaOfertaComponent);
        
    dialogRef.componentInstance.idTipoOrientacionOferta=idTipoOrientacionOferta;
    dialogRef.componentInstance.asignarid(idTipoOrientacionOferta);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AbrirInformacion();
    });
   }

    borrarXId(idTipoOrientacionOferta:number){
    this.tiposorientacionesdelaofertaService.delete(idTipoOrientacionOferta.toString()).subscribe({ 
      next:  () => {
         this.AbrirInformacion();
      }
    });
   }
  constructor(private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private modalService: MatDialog) { }
}
