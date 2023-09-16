import { Component, OnInit, ViewChild } from '@angular/core';
import { SedesEmpleados , SedesEmpleadosComponent, SedesEmpleadosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Sedes, SedesService } from '../../sedes';

@Component({
  selector: 'app-listar-sedes-empleados',
  templateUrl: './listar-sedes-empleados.component.html',
  styleUrls: ['./listar-sedes-empleados.component.css']
})


export class ListarSedesEmpleadosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstSedes : Sedes[]=[];
      lstsedesempleados:SedesEmpleados[]=[];
      lstsedesempleadosTodos:SedesEmpleados[]=[];
      lsttsedes:Sedes[]=[];
      lsttsedesTodos:Sedes[]=[];
     // dataSource!: MatTableDataSource<SedesEmpleados>;
      dataSource!: MatTableDataSource<SedesEmpleados>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
	    displayedColumns: string[] = ['idSede','idPersona', 'telefonoContactoSedeEmpleado','estadoSedeEmpleado','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.sedesempleadosService.GetAll().subscribe({
           next : (datasedesempleados:SedesEmpleados[]) => {
            this.lstsedesempleadosTodos = datasedesempleados;
            this.lstsedesempleados = datasedesempleados;
            //this.dataSource = new MatTableDataSource(datasedesempleados);
            this.dataSource = new MatTableDataSource(datasedesempleados);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttsedes = this.lsttsedesTodos.filter(
            (val) => (
              ((val.nombreSede ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstsedesempleados);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstsedesempleados.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.listarSedes();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        //let sede : number=0;
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
            //sede=element.idSede;
          }
        });
        return persona;
      }

      encontrarNombreSede(idSede:number):string{
        let sede:string="";
        //let persona : number=0;
        this.lstSedes.forEach(element => {
          if(element.idSede==idSede){
            sede=element.nombreSede;
            //sede=element.idSede;
          }
        });
        return sede;
      }

           
      
      listarPersonas(){ 
        this.personasService.GetAll().subscribe({
          next : (lstsedes:Personas[]) => { 
            this.lstPersonas=lstsedes;
          }
        });
      }
      
      listarSedes(){ 
        this.sedesService.GetAll().subscribe({
          next : (lstsedes:Sedes[]) => { 
            this.lstSedes=lstsedes;
          }
        });
      }
    
      AbrirModalSedeEmpleado(idSedeEmpleado:number){
        const dialogRef = this.modalService.open(SedesEmpleadosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idSedeEmpleado=idSedeEmpleado;
        dialogRef.componentInstance.asignarid(idSedeEmpleado);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idSedeEmpleado:number){
        this.sedesempleadosService.delete(idSedeEmpleado.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private sedesempleadosService: SedesEmpleadosService,
        private personasService: PersonasService,
        private sedesService: SedesService,
        private modalService: MatDialog
        ) { }
    }  