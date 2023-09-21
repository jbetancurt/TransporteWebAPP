import { Component, OnInit, ViewChild } from '@angular/core';
import { Destinos , DestinosComponent, DestinosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';


@Component({
  selector: 'app-listar-destinos',
  templateUrl: './listar-destinos.component.html',
  styleUrls: ['./listar-destinos.component.scss']
})

export class ListarDestinosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstCiudades : Ciudades[]=[];
      lstdestinos:Destinos[]=[];
      lstdestinosTodos:Destinos[]=[];
      lsttciudades:Ciudades[]=[];
      lsttciudadesTodos:Ciudades[]=[];
     // dataSource!: MatTableDataSource<Destinos>;
      dataSource!: MatTableDataSource<Destinos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
	    displayedColumns: string[] = ['ciudad','contacto', 'observacionDestino','direccionDestino','telefonoDestino','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.destinosService.GetAll().subscribe({
           next : (datadestinos:Destinos[]) => {
            this.lstdestinosTodos = datadestinos;
            this.lstdestinos = datadestinos;
            //this.dataSource = new MatTableDataSource(datadestinos);
            this.dataSource = new MatTableDataSource(datadestinos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttciudades = this.lsttciudadesTodos.filter(
            (val) => (
              ((val.nombreCiudad ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstdestinos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstdestinos.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.listarCiudades();
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
    
      AbrirModalDestino(idDestino:number){
        const dialogRef = this.modalService.open(DestinosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idDestino=idDestino;
        dialogRef.componentInstance.asignarid(idDestino);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idDestino:number){
        this.destinosService.delete(idDestino.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private destinosService: DestinosService,
        private personasService: PersonasService,
        private ciudadesService: CiudadesService,
        private modalService: MatDialog
        ) { }
    }  