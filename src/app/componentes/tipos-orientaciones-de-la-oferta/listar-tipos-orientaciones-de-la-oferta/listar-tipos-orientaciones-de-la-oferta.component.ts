import { Component, OnInit, ViewChild } from '@angular/core';
  import { TiposOrientacionesDeLaOferta , TiposOrientacionesDeLaOfertaComponent, TiposOrientacionesDeLaOfertaService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';

  @Component({
  selector: 'app-listar-tipos-orientaciones-de-la-oferta',
  templateUrl: './listar-tipos-orientaciones-de-la-oferta.component.html',
  styleUrls: ['./listar-tipos-orientaciones-de-la-oferta.component.css']
})


  
  
 
  
    
    export class ListarTiposOrientacionesDeLaOfertaComponent implements OnInit {
      arraypaginator=environment.paginator;
      lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]=[];
      lsttiposorientacionesdelaofertaTodos:TiposOrientacionesDeLaOferta[]=[];
      dataSource!: MatTableDataSource<TiposOrientacionesDeLaOferta>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre','editar','borrar'];
      public AbrirInformacion()
      {
            
         this.tiposorientacionesdelaofertaService.GetAll().subscribe({
           next : (datatiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => {
            this.lsttiposorientacionesdelaofertaTodos = datatiposorientacionesdelaoferta;
            this.lsttiposorientacionesdelaoferta = datatiposorientacionesdelaoferta;
            this.dataSource = new MatTableDataSource(datatiposorientacionesdelaoferta);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttiposorientacionesdelaoferta = this.lsttiposorientacionesdelaofertaTodos.filter(
            (val) => (
              ((val.nombreTipoOrientacionDeLaOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lsttiposorientacionesdelaoferta);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lsttiposorientacionesdelaoferta.length;
        
      }
      
      
    
      ngOnInit() {
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
    
      AbrirModalTipoOrientacionDeLaOferta(idTipoOrientacionDeLaOferta:number){
        const dialogRef = this.modalService.open(TiposOrientacionesDeLaOfertaComponent).updateSize('80%');
            
        dialogRef.componentInstance.idTipoOrientacionDeLaOferta=idTipoOrientacionDeLaOferta;
        dialogRef.componentInstance.asignarid(idTipoOrientacionDeLaOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idTipoOrientacionDeLaOferta:number){
        this.tiposorientacionesdelaofertaService.delete(idTipoOrientacionDeLaOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
        private modalService: MatDialog) { }
    }
    
