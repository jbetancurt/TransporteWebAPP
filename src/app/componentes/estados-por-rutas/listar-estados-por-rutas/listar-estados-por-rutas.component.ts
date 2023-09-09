import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadosPorRutas , EstadosPorRutasComponent, EstadosPorRutasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-estados-por-rutas',
  templateUrl: './listar-estados-por-rutas.component.html',
  styleUrls: ['./listar-estados-por-rutas.component.css']
})

  export class ListarEstadosPorRutasComponent implements OnInit {
    arraypaginator=environment.paginator;
    lstestadosporrutas:EstadosPorRutas[]=[];
    lstestadosporrutasTodos:EstadosPorRutas[]=[];
    dataSource!: MatTableDataSource<EstadosPorRutas>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.estadosporrutasService.GetAll().subscribe({
         next : (dataestadosporrutas:EstadosPorRutas[]) => {
          
          this.lstestadosporrutasTodos = dataestadosporrutas;
          this.lstestadosporrutas = dataestadosporrutas;
          this.dataSource = new MatTableDataSource(dataestadosporrutas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }

    
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lstestadosporrutas = this.lstestadosporrutasTodos.filter(
          (val) => (
            ((val.nombreEstadoPorRuta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lstestadosporrutas);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lstestadosporrutas.length;
      
    }
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalEstadoPorRuta(idEstadoPorRuta:number){
      const dialogRef = this.modalService.open(EstadosPorRutasComponent).updateSize('80%');
          
      dialogRef.componentInstance.idEstadoPorRuta=idEstadoPorRuta;
      dialogRef.componentInstance.asignarid(idEstadoPorRuta);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idEstadoPorRuta:number){
      this.estadosporrutasService.delete(idEstadoPorRuta.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private estadosporrutasService: EstadosPorRutasService,
      private modalService: MatDialog) { }
  }  
  