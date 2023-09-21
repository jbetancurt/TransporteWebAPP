import { Component, OnInit, ViewChild } from '@angular/core';
  import { Departamentos , DepartamentosComponent, DepartamentosService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
import { Paises, PaisesService } from '../../paises';

@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.scss']
})

export class ListarDepartamentosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPaises : Paises[]=[];
      lstdepartamentos:Departamentos[]=[];
      lstdepartamentosTodos:Departamentos[]=[];
      dataSource!: MatTableDataSource<Departamentos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombredepartamento','codigodepartamento', 'idPais' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.departamentosService.GetAll().subscribe({
           next : (datadepartamentos:Departamentos[]) => {
            this.lstdepartamentosTodos = datadepartamentos;
            this.lstdepartamentos = datadepartamentos;
            this.dataSource = new MatTableDataSource(datadepartamentos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstdepartamentos = this.lstdepartamentosTodos.filter(
            (val) => (
              ((val.nombreDepartamento ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstdepartamentos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstdepartamentos.length;
        
      }
    
      ngOnInit() {
        this.listarPaises();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePais(idPais:number):string{
        let pais:string="";
        this.lstPaises.forEach(element => {
          if(element.idPais==idPais){
            pais=element.nombrePais;
          }
        });
        return pais;
      }
      
      listarPaises(){ 
        this.paisesService.GetAll().subscribe({
          next : (lstpaises:Paises[]) => { 
            this.lstPaises=lstpaises;
          }
        });
      }
    
      AbrirModalDepartamento(idDepartamento:number){
        const dialogRef = this.modalService.open(DepartamentosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idDepartamento=idDepartamento;
        dialogRef.componentInstance.asignarid(idDepartamento);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idDepartamento:number){
        this.departamentosService.delete(idDepartamento.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private departamentosService: DepartamentosService,
        private paisesService: PaisesService,
        private modalService: MatDialog
        ) { }
    }  