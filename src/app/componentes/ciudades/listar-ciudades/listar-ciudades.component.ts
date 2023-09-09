import { Component, OnInit, ViewChild } from '@angular/core';
import { Ciudades , CiudadesComponent, CiudadesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Departamentos, DepartamentosService } from '../../departamentos';
import { Paises, PaisesService } from '../../paises';

@Component({
  selector: 'app-listar-ciudades',
  templateUrl: './listar-ciudades.component.html',
  styleUrls: ['./listar-ciudades.component.css']
})

export class ListarCiudadesComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstDepartamentos : Departamentos[]=[];
      lstPaises : Paises[]=[];
      lstciudades:Ciudades[]=[];
      lstciudadesTodos:Ciudades[]=[];
      dataSource!: MatTableDataSource<Ciudades>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombreciudad','codigociudad', 'idDepartamento' , 'idPais' ,'editar', 'borrar'];
      public AbrirInformacion()
      {
        this.ciudadesService.GetAll().subscribe({
           next : (dataciudades:Ciudades[]) => {
            this.lstciudadesTodos = dataciudades;
            this.lstciudades = dataciudades;
            this.dataSource = new MatTableDataSource(dataciudades);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstciudades = this.lstciudadesTodos.filter(
            (val) => (
              ((val.nombreCiudad ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstciudades);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstciudades.length;
        
      }
    
      ngOnInit() {
        this.listarDepartamentos();
        this.listarPaises();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreDepartamento(idDepartamento:number):string{
        let departamento:string="";
        let pais : number=0;
        this.lstDepartamentos.forEach(element => {
          if(element.idDepartamento==idDepartamento){
            departamento=element.nombreDepartamento;
            pais=element.idPais;
          }
        });
        return departamento;
      }

      encontrarNombrePais(idDepartamento:number):string{
        let idPais = this.obtenerIdPais(idDepartamento);
        let objPais = this.lstPaises.filter(x => x.idPais == idPais);
        if (objPais.length == 0){
          return "";
        }else{
          return objPais[0].nombrePais ?? "";
          
        }
        
        
        
      }

      obtenerIdPais(idDepartamento:number):number{
        let idPais = 0;
        
        this.lstDepartamentos.forEach(element => {
          if(element.idDepartamento==idDepartamento){
            idPais=element.idPais;
          }
        });
        return idPais;
        
      }

      
      listarDepartamentos(){ 
        this.departamentosService.GetAll().subscribe({
          next : (lstpaises:Departamentos[]) => { 
            this.lstDepartamentos=lstpaises;
          }
        });
      }
      
      listarPaises(){ 
        this.paisesService.GetAll().subscribe({
          next : (lstpaises:Paises[]) => { 
            this.lstPaises=lstpaises;
          }
        });
      }
    
      AbrirModalCiudad(idCiudad:number){
        const dialogRef = this.modalService.open(CiudadesComponent).updateSize('80%');
            
        dialogRef.componentInstance.idCiudad=idCiudad;
        dialogRef.componentInstance.asignarid(idCiudad);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idCiudad:number){
        this.ciudadesService.delete(idCiudad.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private ciudadesService: CiudadesService,
        private departamentosService: DepartamentosService,
        private paisesService: PaisesService,
        private modalService: MatDialog
        ) { }
    }  