import { Component, OnInit } from '@angular/core';
import { TiposDePuntosDeControl , TiposDePuntosDeControlComponent, TiposDePuntosDeControlService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-listar-tipos-de-puntos-de-control',
  templateUrl: './listar-tipos-de-puntos-de-control.component.html',
  styleUrls: ['./listar-tipos-de-puntos-de-control.component.css']
})
 

export class ListarTiposDePuntosDeControlComponent implements OnInit {
  lsttiposdepuntosdecontrol:TiposDePuntosDeControl[]=[];
   
  displayedColumns: string[] = ['nombre','editar', 'borrar'];
  public AbrirInformacion()
  {
        
     this.tiposdepuntosdecontrolService.GetAll().subscribe({
       next : (datatiposdepuntosdecontrol:TiposDePuntosDeControl[]) => {
         this.lsttiposdepuntosdecontrol=datatiposdepuntosdecontrol;
       
        }
     });
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }
  

  AbrirModalTipoDePuntoDeControl(idTipoDePuntoDeControl:number){
    const dialogRef = this.modalService.open(TiposDePuntosDeControlComponent);
        
    dialogRef.componentInstance.idTipoDePuntoDeControl=idTipoDePuntoDeControl;
    dialogRef.componentInstance.asignarid(idTipoDePuntoDeControl);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AbrirInformacion();
    });
   }

    borrarXId(idTipoDePuntoDeControl:number){
    this.tiposdepuntosdecontrolService.delete(idTipoDePuntoDeControl.toString()).subscribe({ 
      next:  () => {
         this.AbrirInformacion();
      }
    });
   }
  constructor(private tiposdepuntosdecontrolService: TiposDePuntosDeControlService,
    private modalService: MatDialog) { }
}
