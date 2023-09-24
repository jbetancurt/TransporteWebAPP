import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeLugaresXOfertas , TiposDeLugaresXOfertasComponent, TiposDeLugaresXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-tipos-de-lugares-xofertas',
  templateUrl: './listar-tipos-de-lugares-xofertas.component.html',
  styleUrls: ['./listar-tipos-de-lugares-xofertas.component.scss']
})

  export class ListarTiposDeLugaresXOfertasComponent implements OnInit {
    arraypaginator=environment.paginator;
    lsttiposdelugaresxofertas:TiposDeLugaresXOfertas[]=[];
    lsttiposdelugaresxofertasTodos:TiposDeLugaresXOfertas[]=[];
    dataSource!: MatTableDataSource<TiposDeLugaresXOfertas>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.tiposdelugaresxofertasService.GetAll().subscribe({
         next : (datatiposdelugaresxofertas:TiposDeLugaresXOfertas[]) => {
          this.lsttiposdelugaresxofertasTodos = datatiposdelugaresxofertas;
          this.lsttiposdelugaresxofertas = datatiposdelugaresxofertas;
          this.dataSource = new MatTableDataSource(datatiposdelugaresxofertas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lsttiposdelugaresxofertas = this.lsttiposdelugaresxofertasTodos.filter(
          (val) => (
            ((val.nombreTipoDeLugarXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lsttiposdelugaresxofertas);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lsttiposdelugaresxofertas.length;
      
    }
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalTipoDeLugarXOferta(idTipoDeLugarXOferta:number){
      const dialogRef = this.modalService.open(TiposDeLugaresXOfertasComponent).updateSize('80%');
          
      dialogRef.componentInstance.idTipoDeLugarXOferta=idTipoDeLugarXOferta;
      dialogRef.componentInstance.asignarid(idTipoDeLugarXOferta);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idTipoDeLugarXOferta:number){
      this.tiposdelugaresxofertasService.delete(idTipoDeLugarXOferta.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService,
      private modalService: MatDialog) { }
  }  

