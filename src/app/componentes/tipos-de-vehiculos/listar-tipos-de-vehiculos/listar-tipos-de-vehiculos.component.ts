import { Component, OnInit } from '@angular/core';
import { TiposDeVehiculos , TiposDeVehiculosComponent, TiposDeVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-listar-tipos-de-vehiculos',
  templateUrl: './listar-tipos-de-vehiculos.component.html',
  styleUrls: ['./listar-tipos-de-vehiculos.component.css']
})

export class ListarTiposDeVehiculosComponent implements OnInit {
  lsttiposdevehiculos:TiposDeVehiculos[]=[];
   
  displayedColumns: string[] = ['nombre','editar', 'borrar'];
  public AbrirInformacion()
  {
        
     this.tiposdevehiculosService.GetAll().subscribe({
       next : (datatiposdevehiculos:TiposDeVehiculos[]) => {
         this.lsttiposdevehiculos=datatiposdevehiculos;
       
        }
     });
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }
  

  AbrirModalTipoDeVehiculo(idTipoDeVehiculo:number){
    const dialogRef = this.modalService.open(TiposDeVehiculosComponent);
        
    dialogRef.componentInstance.idTipoDeVehiculo=idTipoDeVehiculo;
    dialogRef.componentInstance.asignarid(idTipoDeVehiculo);
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.AbrirInformacion();
    });
   }

    borrarXId(idTipoDeVehiculo:number){
    this.tiposdevehiculosService.delete(idTipoDeVehiculo.toString()).subscribe({ 
      next:  () => {
         this.AbrirInformacion();
      }
    });
   }
  constructor(private tiposdevehiculosService: TiposDeVehiculosService,
    private modalService: MatDialog) { }
}
