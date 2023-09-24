import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantillasLugaresXOfertas , PlantillasLugaresXOfertasComponent, PlantillasLugaresXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';
import { Empresas, EmpresasService } from '../../empresas';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../../plantillas-ofertas';
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../../tipos-de-lugares-xofertas';


@Component({
  selector: 'app-listar-plantillas-lugares-xofertas',
  templateUrl: './listar-plantillas-lugares-xofertas.component.html',
  styleUrls: ['./listar-plantillas-lugares-xofertas.component.scss']
})



export class ListarPlantillasLugaresXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPersonas : Personas[]=[];
      lstCiudades : Ciudades[]=[];
      lstEmpresas : Empresas[]=[];
      lstPlantillas_Ofertas : Plantillas_Ofertas[]=[];
      lstTiposDeLugaresXOfertas : TiposDeLugaresXOfertas[]=[];
      lstplantillaslugaresxofertas:PlantillasLugaresXOfertas[]=[];
      lstplantillaslugaresxofertasTodos:PlantillasLugaresXOfertas[]=[];
      lsttciudades:Ciudades[]=[];
      lsttciudadesTodos:Ciudades[]=[];
     // dataSource!: MatTableDataSource<PlantillasLugaresXOfertas>;
      dataSource!: MatTableDataSource<PlantillasLugaresXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
	    displayedColumns: string[] = ['idEmpresa','idCiudad','idOferta', 'idPersona','idTipoDeLugarXOferta','nombreLugarXOferta','direccionLugarXOferta','telefonoLugarXOferta','editar', 'borrar'];
      public AbrirInformacion()
      {
        this.plantillaslugaresxofertasService.GetAll().subscribe({
           next : (dataplantillaslugaresxofertas:PlantillasLugaresXOfertas[]) => {
            this.lstplantillaslugaresxofertasTodos = dataplantillaslugaresxofertas;
            this.lstplantillaslugaresxofertas = dataplantillaslugaresxofertas;
            //this.dataSource = new MatTableDataSource(dataplantillaslugaresxofertas);
            this.dataSource = new MatTableDataSource(dataplantillaslugaresxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstplantillaslugaresxofertas = this.lstplantillaslugaresxofertasTodos.filter(
            (val) => (
              ((val.nombreLugarXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstplantillaslugaresxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstplantillaslugaresxofertas.length;
        
      }
    
      ngOnInit() {
        this.listarPersonas();
        this.listarCiudades();
        this.listarEmpresas();
        this.listarPlantillas_Ofertas();
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
        let plantillaoferta:string="";
        this.lstPlantillas_Ofertas.forEach(element => {
          if(element.idOferta==idOferta){
            plantillaoferta=element.nombrePlantillaOferta;
          }
        });
        return plantillaoferta;
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

      listarPlantillas_Ofertas(){ 
        this.plantillas_ofertasService.GetAll().subscribe({
          next : (lstplantillas_ofertas:Plantillas_Ofertas[]) => { 
            this.lstPlantillas_Ofertas=lstplantillas_ofertas;
          }
        });
      }
    
      AbrirModalPlantillaLugarXOferta(idLugarXOferta:number){
        const dialogRef = this.modalService.open(PlantillasLugaresXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idLugarXOferta=idLugarXOferta;
        console.log(idLugarXOferta);
        dialogRef.componentInstance.asignarid(idLugarXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idLugarXOferta:number){
        this.plantillaslugaresxofertasService.delete(idLugarXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private plantillaslugaresxofertasService: PlantillasLugaresXOfertasService,
        private personasService: PersonasService,
        private ciudadesService: CiudadesService,
        private empresasService: EmpresasService,
        private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService,
        private plantillas_ofertasService: Plantillas_OfertasService,
        private modalService: MatDialog
        ) { }
    }  