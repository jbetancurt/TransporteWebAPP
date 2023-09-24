import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadosDeLasOfertas , EstadosDeLasOfertasComponent, EstadosDeLasOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-estados-de-las-ofertas',
  templateUrl: './listar-estados-de-las-ofertas.component.html',
  styleUrls: ['./listar-estados-de-las-ofertas.component.scss']
})

  export class ListarEstadosDeLasOfertasComponent implements OnInit {
    arraypaginator=environment.paginator;
    lstestadosdelasofertas:EstadosDeLasOfertas[]=[];
    lstestadosdelasofertasTodos:EstadosDeLasOfertas[]=[];
    dataSource!: MatTableDataSource<EstadosDeLasOfertas>;
    collectionSize = 0;
    filtroBusqueda: string = "";
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
    public AbrirInformacion()
    {
          
       this.estadosdelasofertasService.GetAll().subscribe({
         next : (dataestadosdelasofertas:EstadosDeLasOfertas[]) => {
          this.lstestadosdelasofertasTodos = dataestadosdelasofertas;
          this.lstestadosdelasofertas = dataestadosdelasofertas;
          this.dataSource = new MatTableDataSource(dataestadosdelasofertas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }
       });
    }
    search(e: any): void {
      let value = (<HTMLTextAreaElement>e.target).value;
      
      this.lstestadosdelasofertas = this.lstestadosdelasofertasTodos.filter(
          (val) => (
            ((val.nombreEstadoDeLaOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
      ));
      this.dataSource = new MatTableDataSource(this.lstestadosdelasofertas);
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      
      this.collectionSize = this.lstestadosdelasofertas.length;
      
    }
  
    ngOnInit() {
      this.AbrirInformacion();
      if (this.dataSource != null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
             
    }
    
  
    AbrirModalEstadoDeLaOferta(idEstadoDeLaOferta:number){
      const dialogRef = this.modalService.open(EstadosDeLasOfertasComponent).updateSize('80%');
          
      dialogRef.componentInstance.idEstadoDeLaOferta=idEstadoDeLaOferta;
      dialogRef.componentInstance.asignarid(idEstadoDeLaOferta);
      dialogRef.componentInstance.onAdd.subscribe(() => {
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.AbrirInformacion();
      });
     }
  
      borrarXId(idEstadoDeLaOferta:number){
      this.estadosdelasofertasService.delete(idEstadoDeLaOferta.toString()).subscribe({ 
        next:  () => {
           this.AbrirInformacion();
        }
      });
     }
    constructor(private estadosdelasofertasService: EstadosDeLasOfertasService,
      private modalService: MatDialog) { }
  }  
