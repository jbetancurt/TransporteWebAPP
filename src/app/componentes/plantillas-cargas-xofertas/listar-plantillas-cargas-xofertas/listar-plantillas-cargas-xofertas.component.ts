import { Component, OnInit, ViewChild } from '@angular/core';
  import { PlantillasCargasXOfertas , PlantillasCargasXOfertasComponent, PlantillasCargasXOfertasService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../../plantillas-ofertas';

@Component({
  selector: 'app-listar-plantillas-cargas-xofertas',
  templateUrl: './listar-plantillas-cargas-xofertas.component.html',
  styleUrls: ['./listar-plantillas-cargas-xofertas.component.scss']
})

export class ListarPlantillasCargasXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPlantillas_Ofertas : Plantillas_Ofertas[]=[];
      lstplantillascargasxofertas:PlantillasCargasXOfertas[]=[];
      lstplantillascargasxofertasTodos:PlantillasCargasXOfertas[]=[];
      dataSource!: MatTableDataSource<PlantillasCargasXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idOferta','nombrePlantillaCargaXOferta','toneladaCargaXOferta', 'tarifaCargaXOferta', 'totalCargaXOferta' , 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.plantillascargasxofertasService.GetAll().subscribe({
           next : (dataplantillascargasxofertas:PlantillasCargasXOfertas[]) => {
            this.lstplantillascargasxofertasTodos = dataplantillascargasxofertas;
            this.lstplantillascargasxofertas = dataplantillascargasxofertas;
            this.dataSource = new MatTableDataSource(dataplantillascargasxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstplantillascargasxofertas = this.lstplantillascargasxofertasTodos.filter(
            (val) => (
              ((val.nombrePlantillaCargaXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstplantillascargasxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstplantillascargasxofertas.length;
        
      }
    
      ngOnInit() {
        this.listarPlantillas_Ofertas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePlantilla_Oferta(idOferta:number):string{
        let plantilla_oferta:string="";
        this.lstPlantillas_Ofertas.forEach(element => {
          if(element.idOferta==idOferta){
            plantilla_oferta=element.nombrePlantillaOferta;
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
    
      AbrirModalPlantillaCargaXOferta(idCargaXOferta:number){
        const dialogRef = this.modalService.open(PlantillasCargasXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idCargaXOferta=idCargaXOferta;
        dialogRef.componentInstance.asignarid(idCargaXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idCargaXOferta:number){
        this.plantillascargasxofertasService.delete(idCargaXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private plantillascargasxofertasService: PlantillasCargasXOfertasService,
        private plantillas_ofertasService: Plantillas_OfertasService,
        private modalService: MatDialog
        ) { }
    }  