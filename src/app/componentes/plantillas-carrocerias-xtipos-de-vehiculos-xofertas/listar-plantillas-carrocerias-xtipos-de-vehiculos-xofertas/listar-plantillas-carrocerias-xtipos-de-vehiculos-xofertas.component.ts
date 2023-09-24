import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertas , PlantillasCarroceriasXTiposDeVehiculosXOfertasComponent, PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../../plantillas-ofertas';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../../carrocerias-xtipos-de-vehiculos';


@Component({
  selector: 'app-listar-plantillas-carrocerias-xtipos-de-vehiculos-xofertas',
  templateUrl: './listar-plantillas-carrocerias-xtipos-de-vehiculos-xofertas.component.html',
  styleUrls: ['./listar-plantillas-carrocerias-xtipos-de-vehiculos-xofertas.component.scss']
})

export class ListarPlantillasCarroceriasXTiposDeVehiculosXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstPlantillas_Ofertas : Plantillas_Ofertas[]=[];
      lstCarroceriasXTiposDeVehiculos : CarroceriasXTiposDeVehiculos[]=[];
      lstplantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
      lstplantillascarroceriasxtiposdevehiculosxofertasTodos:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
      dataSource!: MatTableDataSource<PlantillasCarroceriasXTiposDeVehiculosXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idOferta','idCarroceriaXTipoDeVehiculo','nombrePlantillaCarroceriaXTipoDeVehiculoXOferta', 'editar', 'borrar'];
      public AbrirInformacion()
      {
        this.plantillascarroceriasxtiposdevehiculosxofertasService.GetAll().subscribe({
           next : (dataplantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]) => {
            this.lstplantillascarroceriasxtiposdevehiculosxofertasTodos = dataplantillascarroceriasxtiposdevehiculosxofertas;
            this.lstplantillascarroceriasxtiposdevehiculosxofertas = dataplantillascarroceriasxtiposdevehiculosxofertas;
            this.dataSource = new MatTableDataSource(dataplantillascarroceriasxtiposdevehiculosxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstplantillascarroceriasxtiposdevehiculosxofertas = this.lstplantillascarroceriasxtiposdevehiculosxofertasTodos.filter(
            (val) => (
              ((val.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstplantillascarroceriasxtiposdevehiculosxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstplantillascarroceriasxtiposdevehiculosxofertas.length;
        
      }
    
      ngOnInit() {
        this.listarPlantillas_Ofertas();
        this.listarCarroceriasXTiposDeVehiculos();
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

      listarCarroceriasXTiposDeVehiculos(){
        this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
          next : (lstcarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]) => { 
            this.lstCarroceriasXTiposDeVehiculos=lstcarroceriasxtiposdevehiculos;
          }
        });
      }
    
      AbrirModalPlantillaCarroceriaXTipoDeVehiculoXOferta(idCarroceriaXTipoDeVehiculoXOferta:number){
        const dialogRef = this.modalService.open(PlantillasCarroceriasXTiposDeVehiculosXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idCarroceriaXTipoDeVehiculoXOferta=idCarroceriaXTipoDeVehiculoXOferta;
        dialogRef.componentInstance.asignarid(idCarroceriaXTipoDeVehiculoXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idCarroceriaXTipoDeVehiculoXOferta:number){
        this.plantillascarroceriasxtiposdevehiculosxofertasService.delete(idCarroceriaXTipoDeVehiculoXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private plantillascarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService,
        private plantillas_ofertasService: Plantillas_OfertasService,
        private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
        private modalService: MatDialog
        ) { }
    }  