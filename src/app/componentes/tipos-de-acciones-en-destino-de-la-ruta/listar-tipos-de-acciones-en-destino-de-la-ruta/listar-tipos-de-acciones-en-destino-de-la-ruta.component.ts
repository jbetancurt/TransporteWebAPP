
 import { Component, OnInit } from '@angular/core';
  import { TiposDeAccionesEnDestinoDeLaRuta , TiposDeAccionesEnDestinoDeLaRutaComponent, TiposDeAccionesEnDestinoDeLaRutaService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { tap } from 'rxjs/operators';
  
  
  @Component({
    selector: 'app-listar-tipos-de-acciones-en-destino-de-la-ruta',
    templateUrl: './listar-tipos-de-acciones-en-destino-de-la-ruta.component.html',
    styleUrls: ['./listar-tipos-de-acciones-en-destino-de-la-ruta.component.css']
  })
  export class ListarTiposDeAccionesEnDestinoDeLaRutaComponent implements OnInit {
    lsttiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]=[];
     
    displayedColumns: string[] = ['nombre','editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdeaccionesendestinodelarutaService.GetAll().subscribe({
         next : (datatiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]) => {
           this.lsttiposdeaccionesendestinodelaruta=datatiposdeaccionesendestinodelaruta;
         
          }
       });
    }
  
    ngOnInit() {
      this.AbrirInformacion();
             
    }
    
  
    AbrirModalTiposDeAccionesEnDestinoDeLaRuta(idTipoDeAccionEnDestinoDeLaRuta:number){
      const dialogRef = this.modalService.open(TiposDeAccionesEnDestinoDeLaRutaComponent);
          
      dialogRef.componentInstance.idTipoDeAccionEnDestinoDeLaRuta=idTipoDeAccionEnDestinoDeLaRuta;
      dialogRef.componentInstance.asignarid(idTipoDeAccionEnDestinoDeLaRuta);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDeAccionEnDestinoDeLaRuta:number){
      this.tiposdeaccionesendestinodelarutaService.delete(idTipoDeAccionEnDestinoDeLaRuta.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdeaccionesendestinodelarutaService: TiposDeAccionesEnDestinoDeLaRutaService,
      private modalService: MatDialog) { }
  }
  
