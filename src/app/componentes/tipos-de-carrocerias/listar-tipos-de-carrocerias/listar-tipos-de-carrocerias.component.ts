import { Component, OnInit } from '@angular/core';
  import { TiposDeCarrocerias , TiposDeCarroceriasComponent, TiposDeCarroceriasService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { tap } from 'rxjs/operators';
  
@Component({
  selector: 'app-listar-tipos-de-carrocerias',
  templateUrl: './listar-tipos-de-carrocerias.component.html',
  styleUrls: ['./listar-tipos-de-carrocerias.component.css']
})
 
  
  
  export class ListarTiposDeCarroceriasComponent implements OnInit {
    lsttiposdecarrocerias:TiposDeCarrocerias[]=[];
     
    displayedColumns: string[] = ['nombre','editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdecarroceriasService.GetAll().subscribe({
         next : (datatiposdecarrocerias:TiposDeCarrocerias[]) => {
           this.lsttiposdecarrocerias=datatiposdecarrocerias;
         
          }
       });
    }
  
    ngOnInit() {
      this.AbrirInformacion();
             
    }
    
  
    AbrirModalTipoDeCarroceria(idTipoDeCarroceria:number){
      const dialogRef = this.modalService.open(TiposDeCarroceriasComponent);
          
      dialogRef.componentInstance.idTipoDeCarroceria=idTipoDeCarroceria;
      dialogRef.componentInstance.asignarid(idTipoDeCarroceria);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDeCarroceria:number){
      this.tiposdecarroceriasService.delete(idTipoDeCarroceria.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdecarroceriasService: TiposDeCarroceriasService,
      private modalService: MatDialog) { }
  }
  