
 import { Component, OnInit, ViewChild } from '@angular/core';
  import { TiposDeAccionesEnDestinoDeLaRuta , TiposDeAccionesEnDestinoDeLaRutaComponent, TiposDeAccionesEnDestinoDeLaRutaService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { tap } from 'rxjs/operators';
  import { environment } from 'src/environments/environment';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  
  
  @Component({
    selector: 'app-listar-tipos-de-acciones-en-destino-de-la-ruta',
    templateUrl: './listar-tipos-de-acciones-en-destino-de-la-ruta.component.html',
    styleUrls: ['./listar-tipos-de-acciones-en-destino-de-la-ruta.component.css']
  })
    
    
    export class ListarTiposDeAccionesEnDestinoDeLaRutaComponent implements OnInit {
      arraypaginator=environment.paginator;
      lsttiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]=[];
      lsttiposdeaccionesendestinodelarutaTodos:TiposDeAccionesEnDestinoDeLaRuta[]=[];
      dataSource!: MatTableDataSource<TiposDeAccionesEnDestinoDeLaRuta>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.tiposdeaccionesendestinodelarutaService.GetAll().subscribe({
           next : (datatiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]) => {
            this.lsttiposdeaccionesendestinodelarutaTodos = datatiposdeaccionesendestinodelaruta;
            this.lsttiposdeaccionesendestinodelaruta = datatiposdeaccionesendestinodelaruta;
            this.dataSource = new MatTableDataSource(datatiposdeaccionesendestinodelaruta);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttiposdeaccionesendestinodelaruta = this.lsttiposdeaccionesendestinodelarutaTodos.filter(
            (val) => (
              ((val.nombreTipoDeAccionEnDestinoDeLaRuta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lsttiposdeaccionesendestinodelaruta);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lsttiposdeaccionesendestinodelaruta.length;
        
      }
          
    
      ngOnInit() {
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
    
      AbrirModalTipoDeAccionEnDestinoDeLaRuta(idTipoDeAccionEnDestinoDeLaRuta:number){
        const dialogRef = this.modalService.open(TiposDeAccionesEnDestinoDeLaRutaComponent).updateSize('80%');
            
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
    
    