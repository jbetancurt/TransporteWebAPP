import { Component, OnInit, ViewChild } from '@angular/core';
import { Plantillas_Ofertas , Plantillas_OfertasComponent, Plantillas_OfertasService } from '../';
import { PlantillasLugaresXOfertasService } from '../../plantillas-lugares-xofertas';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from '../../plantillas-carrocerias-xtipos-de-vehiculos-xofertas';
import { PlantillasRequisitosXOfertasServices } from '../../plantillas-requisitos-xofertas';
import { PlantillasCargasXOfertasService } from '../../plantillas-cargas-xofertas';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../../tipos-orientaciones-de-la-oferta';
import { TiposDePlantillasOfertas,TiposDePlantillasOfertasService } from '../../tipos-de-plantillas-ofertas';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-listar-plantillas-ofertas',
  templateUrl: './listar-plantillas-ofertas.component.html',
  styleUrls: ['./listar-plantillas-ofertas.component.scss']
})


export class ListarPlantillasOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstTiposDePlantillasOfertas : TiposDePlantillasOfertas[]=[];
      lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
      lstofertas:Plantillas_Ofertas[]=[];
      lstofertasTodos:Plantillas_Ofertas[]=[];
      dataSource!: MatTableDataSource<Plantillas_Ofertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresa','nombrePlantillaOferta','idTipoDePlantillaOferta','idTipoOrientacionDeLaOferta','tituloOferta','valorTotalDeLaOferta' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.plantillas_ofertasService.GetAll().subscribe({
           next : (dataofertas:Plantillas_Ofertas[]) => {
            this.lstofertasTodos = dataofertas;
            this.lstofertas = dataofertas;
            this.dataSource = new MatTableDataSource(dataofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstofertas = this.lstofertasTodos.filter(
            (val) => (
              ((val.nombrePlantillaOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstofertas.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.listarTiposDePlantillasOfertas();
        this.listarTiposOrientacionesDeLaOferta();
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

      encontrarNombreTipoDePlantillaOferta(idTipoDePlantillaOferta:number):string{
        let tipodeplantillaoferta:string="";
        this.lstTiposDePlantillasOfertas.forEach(element => {
          if(element.idTipoDePlantillaOferta==idTipoDePlantillaOferta){
            tipodeplantillaoferta=element.nombreTipoDePlantillaOferta;
          }
        });
        return tipodeplantillaoferta;
      }

      listarTiposDePlantillasOfertas(){
        this.tiposdeplantillasofertasService.GetAll().subscribe({
          next : (lsttiposdeplantillasofertas:TiposDePlantillasOfertas[]) => {
            this.lstTiposDePlantillasOfertas=lsttiposdeplantillasofertas;
          }
        });
      }

      encontrarNombreTipoOrientacionDeLaOferta(idTipoOrientacionDeLaOferta:number):string{
        let tipoorientaciondelaoferta:string="";
        this.lstTiposOrientacionesDeLaOferta.forEach(element => {
          if(element.idTipoOrientacionDeLaOferta==idTipoOrientacionDeLaOferta){
            tipoorientaciondelaoferta=element.nombreTipoOrientacionDeLaOferta;
          }
        });
        return tipoorientaciondelaoferta;
      }

      listarTiposOrientacionesDeLaOferta(){
        this.tiposorientacionesdelaofertaService.GetAll().subscribe({
          next : (lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => {
            this.lstTiposOrientacionesDeLaOferta=lsttiposorientacionesdelaoferta;
          }
        });
      }


    
      AbrirModalPlantilla_Oferta(idOferta:number){
        const dialogRef = this.modalService.open(Plantillas_OfertasComponent).updateSize('100%','100%');
        //const dialogRef = this.modalService.open(OfertasComponent).updateSize('100%','100%');    
        dialogRef.componentInstance.idOferta=idOferta;
        dialogRef.componentInstance.asignarid(idOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idOferta:number){
        
          forkJoin([
            this.plantillaslugaresxofertaService.BorrarPorIdOferta(idOferta.toString()),
            this.plantillascarroceriasxtiposdevehiculosxofertasService.BorrarPorIdOferta(idOferta.toString()),
            this.plantillasrequisitosxofertasService.BorrarPorIdOferta(idOferta.toString()),
            this.plantillascargasxofertasService.BorrarPorIdOferta(idOferta.toString())
          ]).subscribe({
            next: () => {
             
              // Borra la oferta después de que se hayan borrado los lugares, requisitos y cargas
              this.plantillas_ofertasService.delete(idOferta.toString()).subscribe({
                next: () => {
                
                  this.AbrirInformacion();
                }
              });
            }
          });
        }
        
      constructor(
        private plantillas_ofertasService: Plantillas_OfertasService,
        private plantillaslugaresxofertaService: PlantillasLugaresXOfertasService,
        private plantillascarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService,
        private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices,
        private plantillascargasxofertasService: PlantillasCargasXOfertasService,
        private empresasService: EmpresasService,
        private tiposdeplantillasofertasService: TiposDePlantillasOfertasService,
        private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
        private modalService: MatDialog
        ) { }
    }  