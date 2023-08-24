import { Component, OnInit } from '@angular/core';
  import { TiposDePersonasPorVehiculos , TiposDePersonasPorVehiculosComponent, TiposDePersonasPorVehiculosService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-tipos-de-personas-por-vehiculos',
  templateUrl: './listar-tipos-de-personas-por-vehiculos.component.html',
  styleUrls: ['./listar-tipos-de-personas-por-vehiculos.component.css']
})
  export class ListarTiposDePersonasPorVehiculosComponent implements OnInit {
    lsttiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]=[];
     
    displayedColumns: string[] = ['nombre','editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdepersonasporvehiculosService.GetAll().subscribe({
         next : (datatiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]) => {
           this.lsttiposdepersonasporvehiculos=datatiposdepersonasporvehiculos;
         
          }
       });
    }
  
    ngOnInit() {
      this.AbrirInformacion();
             
    }
    
  
    AbrirModalTipoDePersonaPorVehiculo(idTipoDePersonaPorVehiculo:number){
      const dialogRef = this.modalService.open(TiposDePersonasPorVehiculosComponent);
          
      dialogRef.componentInstance.idTipoDePersonaPorVehiculo=idTipoDePersonaPorVehiculo;
      dialogRef.componentInstance.asignarid(idTipoDePersonaPorVehiculo);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDePersonaPorVehiculo:number){
      this.tiposdepersonasporvehiculosService.delete(idTipoDePersonaPorVehiculo.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdepersonasporvehiculosService: TiposDePersonasPorVehiculosService,
      private modalService: MatDialog) { }
  }
  

