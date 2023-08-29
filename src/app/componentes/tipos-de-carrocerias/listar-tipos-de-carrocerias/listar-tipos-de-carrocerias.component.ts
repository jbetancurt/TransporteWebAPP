
import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeCarrocerias , TiposDeCarroceriasComponent, TiposDeCarroceriasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
  
@Component({
  selector: 'app-listar-tipos-de-carrocerias',
  templateUrl: './listar-tipos-de-carrocerias.component.html',
  styleUrls: ['./listar-tipos-de-carrocerias.component.css']
})
 
    
    export class ListarTiposDeCarroceriasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lsttiposdecarrocerias:TiposDeCarrocerias[]=[];
      lsttiposdecarroceriasTodos:TiposDeCarrocerias[]=[];
      dataSource!: MatTableDataSource<TiposDeCarrocerias>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.tiposdecarroceriasService.GetAll().subscribe({
           next : (datatiposdecarrocerias:TiposDeCarrocerias[]) => {
            this.lsttiposdecarroceriasTodos = datatiposdecarrocerias;
            this.lsttiposdecarrocerias = datatiposdecarrocerias;
            this.dataSource = new MatTableDataSource(datatiposdecarrocerias);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttiposdecarrocerias = this.lsttiposdecarroceriasTodos.filter(
            (val) => (
              ((val.nombreTipoDeCarroceria ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lsttiposdecarrocerias);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lsttiposdecarrocerias.length;
        
      }
      
     
    
      ngOnInit() {
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
    
      AbrirModalTipoDeCarroceria(idTipoDeCarroceria:number){
        const dialogRef = this.modalService.open(TiposDeCarroceriasComponent).updateSize('80%');
            
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
    