import { Component, OnInit, ViewChild } from '@angular/core';
import { LugaresXOfertas , LugaresXOfertasComponent, LugaresXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';
import { Empresas, EmpresasService } from '../../empresas';
import { Ofertas, OfertasService } from '../../ofertas';
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../../tipos-de-lugares-xofertas';

@Component({
  selector: 'app-listar-lugares-xofertas',
  templateUrl: './listar-lugares-xofertas.component.html',
  styleUrls: ['./listar-lugares-xofertas.component.scss']
})


export class ListarLugaresXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstCiudades : Ciudades[]=[];
      lstEmpresas : Empresas[]=[];
      lstOfertas : Ofertas[]=[];
      lstTiposDeLugaresXOfertas : TiposDeLugaresXOfertas[]=[];
      lstlugaresxofertas:LugaresXOfertas[]=[];
      lstlugaresxofertasTodos:LugaresXOfertas[]=[];
      lsttciudades:Ciudades[]=[];
      lsttciudadesTodos:Ciudades[]=[];
     // dataSource!: MatTableDataSource<LugaresXOfertas>;
      dataSource!: MatTableDataSource<LugaresXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
	    displayedColumns: string[] = ['idEmpresa','idCiudad','idOferta', 'idPersona','idTipoDeLugarXOferta','nombreLugarXOferta','direccionLugarXOferta','telefonoLugarXOferta','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.lugaresxofertasService.GetAll().subscribe({
           next : (datalugaresxofertas:LugaresXOfertas[]) => {
            this.lstlugaresxofertasTodos = datalugaresxofertas;
            this.lstlugaresxofertas = datalugaresxofertas;
            //this.dataSource = new MatTableDataSource(datalugaresxofertas);
            this.dataSource = new MatTableDataSource(datalugaresxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstlugaresxofertas = this.lstlugaresxofertasTodos.filter(
            (val) => (
              ((val.nombreLugarXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstlugaresxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstlugaresxofertas.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.listarCiudades();
        this.listarEmpresas();
        this.listarOfertas();
        this.listarTiposDeLugaresXOfertas();
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

      encontrarNombreTipoDeLugarXOferta(idTipoDeLugarXOferta:number):string{
        let tipodelugarxoferta:string="";
        this.lstTiposDeLugaresXOfertas.forEach(element => {
          if(element.idTipoDeLugarXOferta==idTipoDeLugarXOferta){
            tipodelugarxoferta=element.nombreTipoDeLugarXOferta;
          }
        });
        return tipodelugarxoferta;
      }

      encontrarNombreOferta(idOferta:number):string{
        let oferta:string="";
        this.lstOfertas.forEach(element => {
          if(element.idOferta==idOferta){
            oferta=element.tituloOferta;
          }
        });
        return oferta;
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

      listarTiposDeLugaresXOfertas(){ 
        this.tiposdelugaresxofertasService.GetAll().subscribe({
          next : (lsttiposdelugaresxofertas:TiposDeLugaresXOfertas[]) => { 
            this.lstTiposDeLugaresXOfertas=lsttiposdelugaresxofertas;
          }
        });
      }

      listarOfertas(){ 
        this.ofertasService.GetAll().subscribe({
          next : (lstofertas:Ofertas[]) => { 
            this.lstOfertas=lstofertas;
          }
        });
      }
    
      AbrirModalLugarXOferta(idLugarXOferta:number){
        const dialogRef = this.modalService.open(LugaresXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idLugarXOferta=idLugarXOferta;
        dialogRef.componentInstance.asignarid(idLugarXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idLugarXOferta:number){
        this.lugaresxofertasService.delete(idLugarXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private lugaresxofertasService: LugaresXOfertasService,
        private personasService: PersonasService,
        private ciudadesService: CiudadesService,
        private empresasService: EmpresasService,
        private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService,
        private ofertasService: OfertasService,
        private modalService: MatDialog
        ) { }
    }  