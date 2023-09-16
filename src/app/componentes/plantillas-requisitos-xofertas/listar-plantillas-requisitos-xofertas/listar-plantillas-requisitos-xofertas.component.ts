import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantillasRequisitosXOfertas , PlantillasRequisitosXOfertasComponent, PlantillasRequisitosXOfertasServices} from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Requisitos, RequisitosService } from '../../requisitos';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../../plantillas-ofertas';
import { Ciudades, CiudadesService } from '../../ciudades';

@Component({
  selector: 'app-listar-plantillas-requisitos-xofertas',
  templateUrl: './listar-plantillas-requisitos-xofertas.component.html',
  styleUrls: ['./listar-plantillas-requisitos-xofertas.component.css']
})


export class ListarPlantillasRequisitosXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstRequisitos : Requisitos[]=[];
      lstPlantillas_Ofertas : Plantillas_Ofertas[]=[];
      lstCiudades : Ciudades[]=[];
      lstplantillasrequisitosxofertas:PlantillasRequisitosXOfertas[]=[];
      lstplantillasrequisitosxofertasTodos:PlantillasRequisitosXOfertas[]=[];
      dataSource!: MatTableDataSource<PlantillasRequisitosXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idOferta','idRequisito','requeridoRequisitoXOferta', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.plantillasrequisitosxofertasServices.GetAll().subscribe({
           next : (dataplantillasrequisitosxofertas:PlantillasRequisitosXOfertas[]) => {
            this.lstplantillasrequisitosxofertasTodos = dataplantillasrequisitosxofertas;
            this.lstplantillasrequisitosxofertas = dataplantillasrequisitosxofertas;
            this.dataSource = new MatTableDataSource(dataplantillasrequisitosxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
      //  this.lstplantillasrequisitosxofertas = this.lstplantillasrequisitosxofertasTodos.filter(
      //     (val) => (
     //        ((val.tituloPlantillaRequisitoXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstplantillasrequisitosxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstplantillasrequisitosxofertas.length;
        
      }
    
      ngOnInit() {
        this.listarRequisitos();
        this.listarPlantillas_Ofertas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreRequisito(idRequisito:number):string{
        let requisito:string="";
        this.lstRequisitos.forEach(element => {
          if(element.idRequisito==idRequisito){
            requisito=element.nombreRequisito;
          }
        });
        return requisito;
      }
      
      listarRequisitos(){ 
        this.requisitosService.GetAll().subscribe({
          next : (lstrequisitos:Requisitos[]) => { 
            this.lstRequisitos=lstrequisitos;
          }
        });
      }

      encontrarNombrePlantilla_Oferta(idOferta:number):string{
        let plantilla_oferta:string="";
        this.lstPlantillas_Ofertas.forEach(element => {
          if(element.idOferta==idOferta){
            plantilla_oferta=element.tituloOferta;
          }
        });
        return plantilla_oferta;
      }

      listarPlantillas_Ofertas(){
        this.plantillas_ofertasService.GetAll().subscribe({
          next : (lstplantillas_ofertas:Plantillas_Ofertas[]) => {
            this.lstPlantillas_Ofertas=lstplantillas_ofertas;
          }
        });
      }

      


    
      AbrirModalPlantillaRequisitoXOferta(idRequisitoXOferta:number){
        const dialogRef = this.modalService.open(PlantillasRequisitosXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idRequisitoXOferta=idRequisitoXOferta;
        dialogRef.componentInstance.asignarid(idRequisitoXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idRequisitoXOferta:number){
        this.plantillasrequisitosxofertasServices.delete(idRequisitoXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private plantillasrequisitosxofertasServices: PlantillasRequisitosXOfertasServices,
        private requisitosService: RequisitosService,
        private plantillas_ofertasService: Plantillas_OfertasService,
        private modalService: MatDialog
        ) { }
    }  