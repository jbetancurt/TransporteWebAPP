import { Component, OnInit, ViewChild } from '@angular/core';
import { Paises , PaisesComponent, PaisesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-listar-paises',
  templateUrl: './listar-paises.component.html',
  styleUrls: ['./listar-paises.component.css']
})

    export class ListarPaisesComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPaises : Paises[]=[];
      lstpaises:Paises[]=[];
      lstpaisesTodos:Paises[]=[];
      dataSource!: MatTableDataSource<Paises>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombrepais', 'codigopais' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.paisesService.GetAll().subscribe({
           next : (datapaises:Paises[]) => {
            this.lstpaisesTodos = datapaises;
            this.lstpaises = datapaises;
            this.dataSource = new MatTableDataSource(datapaises);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstpaises = this.lstpaisesTodos.filter(
            (val) => (
              ((val.nombrePais ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstpaises);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstpaises.length;
        
      }
    
      ngOnInit() {
        this.listarPaises();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
            
      listarPaises(){ 
        this.paisesService.GetAll().subscribe({
          next : (lstPaises:Paises[]) => { 
            this.lstPaises=lstPaises;
          }
        });
      }
    
      AbrirModalPais(idPais:number){
        const dialogRef = this.modalService.open(PaisesComponent).updateSize('80%');
            
        dialogRef.componentInstance.idPais=idPais;
        dialogRef.componentInstance.asignarid(idPais);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idPais:number){
        this.paisesService.delete(idPais.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
       // private paisesService: PaisesService,
        private paisesService: PaisesService,
        private modalService: MatDialog
        ) { }
    }  
