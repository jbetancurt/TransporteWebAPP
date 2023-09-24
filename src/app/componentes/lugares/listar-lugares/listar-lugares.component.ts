import { Component, OnInit, ViewChild } from '@angular/core';
import { Lugares , LugaresComponent, LugaresService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';
import { Empresas, EmpresasService } from '../../empresas';

@Component({
  selector: 'app-listar-lugares',
  templateUrl: './listar-lugares.component.html',
  styleUrls: ['./listar-lugares.component.scss']
})

export class ListarLugaresComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstCiudades : Ciudades[]=[];
      lstEmpresas : Empresas[]=[];
      lstlugares:Lugares[]=[];
      lstlugaresTodos:Lugares[]=[];
      lsttciudades:Ciudades[]=[];
      lsttciudadesTodos:Ciudades[]=[];
     // dataSource!: MatTableDataSource<Lugares>;
      dataSource!: MatTableDataSource<Lugares>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
	    displayedColumns: string[] = ['idEmpresa','idCiudad', 'idPersona','nombreLugar','direccionLugar','telefonoLugar','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.lugaresService.GetAll().subscribe({
           next : (datalugares:Lugares[]) => {
            this.lstlugaresTodos = datalugares;
            this.lstlugares = datalugares;
            //this.dataSource = new MatTableDataSource(datalugares);
            this.dataSource = new MatTableDataSource(datalugares);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstlugares = this.lstlugaresTodos.filter(
            (val) => (
              ((val.observacionLugar ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstlugares);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstlugares.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.listarCiudades();
        this.listarEmpresas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        //let ciudad : number=0;
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
            //ciudad=element.idCiudad;
          }
        });
        return persona;
      }

      encontrarNombreCiudad(idCiudad:number):string{
        let ciudad:string="";
        //let persona : number=0;
        this.lstCiudades.forEach(element => {
          if(element.idCiudad==idCiudad){
            ciudad=element.nombreCiudad;
            //ciudad=element.idCiudad;
          }
        });
        return ciudad;
      }

      encontrarNombreEmpresa(idEmpresa:number):string{
        let empresa:string="";
        this.lstEmpresas.forEach(element => {
          if(element.idEmpresa==idEmpresa){
            empresa=element.nombreEmpresa;
          }
        });
        return empresa;
      }

           
      
      listarPersonas(){ 
        this.personasService.GetAll().subscribe({
          next : (lstciudades:Personas[]) => { 
            this.lstPersonas=lstciudades;
          }
        });
      }
      
      listarCiudades(){ 
        this.ciudadesService.GetAll().subscribe({
          next : (lstciudades:Ciudades[]) => { 
            this.lstCiudades=lstciudades;
          }
        });
      }

      listarEmpresas(){ 
        this.empresasService.GetAll().subscribe({
          next : (lstempresas:Empresas[]) => { 
            this.lstEmpresas=lstempresas;
          }
        });
      }
    
      AbrirModalLugar(idLugar:number){
        const dialogRef = this.modalService.open(LugaresComponent).updateSize('80%');
            
        dialogRef.componentInstance.idLugar=idLugar;
        dialogRef.componentInstance.asignarid(idLugar);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idLugar:number){
        this.lugaresService.delete(idLugar.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private lugaresService: LugaresService,
        private personasService: PersonasService,
        private ciudadesService: CiudadesService,
        private empresasService: EmpresasService,
        private modalService: MatDialog
        ) { }
    }  