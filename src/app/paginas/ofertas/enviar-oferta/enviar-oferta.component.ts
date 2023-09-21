import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfertasComponent } from 'src/app/componentes/ofertas';

@Component({
  selector: 'app-enviar-oferta',
  templateUrl: './enviar-oferta.component.html',
  styleUrls: ['./enviar-oferta.component.css']
})
export class EnviarOfertaComponent implements OnInit {
  idOfertaInput: string = "1";
  refrescarinformacion=false;
  AbrirModalOferta(idOferta:number){
    const dialogRef = this.modalService.open(OfertasComponent).updateSize('80%');
        
    dialogRef.componentInstance.idOferta=idOferta;
    dialogRef.componentInstance.asignarid(idOferta);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refrescarinformacion=true;
    });
  }
  constructor(
//    private ofertasService: OfertasService,
//    private empresasService: EmpresasService,
//    private destinosService: DestinosService,
//    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private modalService: MatDialog
    ) { }
  ngOnInit(): void {
    this.AbrirModalOferta(0);
  }

}
