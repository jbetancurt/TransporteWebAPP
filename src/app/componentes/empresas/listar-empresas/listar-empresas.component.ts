import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresas , EmpresasComponent, EmpresasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { TiposDeEmpresas, TiposDeEmpresasService } from '../../tipos-de-empresas';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.scss']
})

export class ListarEmpresasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstTiposDeEmpresas : TiposDeEmpresas[]=[];
      lstempresas:Empresas[]=[];
      lstempresasTodos:Empresas[]=[];
      lstttiposdeempresas:TiposDeEmpresas[]=[];
      lstttiposdeempresasTodos:TiposDeEmpresas[]=[];
     // dataSource!: MatTableDataSource<Empresas>;
      dataSource!: MatTableDataSource<Empresas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
	    displayedColumns: string[] = ['nombreEmpresa','idTipoDeEmpresa','idContacto', 'nitEmpresa','correoEmpresa','telefonoEmpresa','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.empresasService.GetAll().subscribe({
           next : (dataempresas:Empresas[]) => {
            this.lstempresasTodos = dataempresas;
            this.lstempresas = dataempresas;
            //this.dataSource = new MatTableDataSource(dataempresas);
            this.dataSource = new MatTableDataSource(dataempresas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstempresas = this.lstempresasTodos.filter(
            (val) => (
              ((val.nombreEmpresa ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstempresas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstempresas.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.listarTiposDeEmpresas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        //let tipodeempresa : number=0;
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
            //tipodeempresa=element.idTipoDeEmpresa;
          }
        });
        return persona;
      }

      encontrarNombreTipoDeEmpresa(idTipoDeEmpresa:number):string{
        let tipodeempresa:string="";
        //let persona : number=0;
        this.lstTiposDeEmpresas.forEach(element => {
          if(element.idTipoDeEmpresa==idTipoDeEmpresa){
            tipodeempresa=element.nombreTipoDeEmpresa;
            //tipodeempresa=element.idTipoDeEmpresa;
          }
        });
        return tipodeempresa;
      }

           
      
      listarPersonas(){ 
        this.personasService.GetAll().subscribe({
          next : (lsttiposdeempresas:Personas[]) => { 
            this.lstPersonas=lsttiposdeempresas;
          }
        });
      }
      
      listarTiposDeEmpresas(){ 
        this.tiposdeempresasService.GetAll().subscribe({
          next : (lsttiposdeempresas:TiposDeEmpresas[]) => { 
            this.lstTiposDeEmpresas=lsttiposdeempresas;
          }
        });
      }
    
      AbrirModalEmpresa(idEmpresa:number){
        const dialogRef = this.modalService.open(EmpresasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idEmpresa=idEmpresa;
        dialogRef.componentInstance.asignarid(idEmpresa);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idEmpresa:number){
        this.empresasService.delete(idEmpresa.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private empresasService: EmpresasService,
        private personasService: PersonasService,
        private tiposdeempresasService: TiposDeEmpresasService,
        private modalService: MatDialog
        ) { }
    }  