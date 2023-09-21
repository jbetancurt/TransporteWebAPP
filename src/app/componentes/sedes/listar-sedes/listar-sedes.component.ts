import { Component, OnInit, ViewChild } from '@angular/core';
import { Sedes , SedesComponent, SedesService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';

@Component({
  selector: 'app-listar-sedes',
  templateUrl: './listar-sedes.component.html',
  styleUrls: ['./listar-sedes.component.scss']
})

export class ListarSedesComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstPersonas : Personas[]=[];
      lstCiudades : Ciudades[]=[];
      lstsedes:Sedes[]=[];
      lstsedesTodos:Sedes[]=[];
      dataSource!: MatTableDataSource<Sedes>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresa','idCiudad', 'idPersona' ,'nombreSede','telefonoSede','direccionSede', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.sedesService.GetAll().subscribe({
           next : (datasedes:Sedes[]) => {
            this.lstsedesTodos = datasedes;
            this.lstsedes = datasedes;
            this.dataSource = new MatTableDataSource(datasedes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstsedes = this.lstsedesTodos.filter(
            (val) => (
              ((val.nombreSede ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstsedes);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstsedes.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.listarPersonas();
        this.listarCiudades();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
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
      
      listarEmpresas(){ 
        this.empresasService.GetAll().subscribe({
          next : (lstempresas:Empresas[]) => { 
            this.lstEmpresas=lstempresas;
          }
        });
      }

      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
          }
        });
        return persona;
      }

      listarPersonas(){
        this.personasService.GetAll().subscribe({
          next : (lstpersonas:Personas[]) => {
            this.lstPersonas=lstpersonas;
          }
        });
      }

      encontrarNombreCiudad(idCiudad:number):string{
        let ciudad:string="";
        this.lstCiudades.forEach(element => {
          if(element.idCiudad==idCiudad){
            ciudad=element.nombreCiudad;
          }
        });
        return ciudad;
      }

      listarCiudades(){
        this.ciudadesService.GetAll().subscribe({
          next : (lstciudades:Ciudades[]) => {
            this.lstCiudades=lstciudades;
          }
        });
      }


    
      AbrirModalSede(idSede:number){
        const dialogRef = this.modalService.open(SedesComponent).updateSize('80%');
            
        dialogRef.componentInstance.idSede=idSede;
        dialogRef.componentInstance.asignarid(idSede);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idSede:number){
        this.sedesService.delete(idSede.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private sedesService: SedesService,
        private empresasService: EmpresasService,
        private personasService: PersonasService,
        private ciudadesService: CiudadesService,
        private modalService: MatDialog
        ) { }
    }  