import { Component, OnInit, ViewChild } from '@angular/core';
import { PostuladosXOfertas , PostuladosXOfertasComponent, PostuladosXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Vehiculos, VehiculosService } from '../../vehiculos';
import { Ofertas, OfertasService } from '../../ofertas';

@Component({
  selector: 'app-listar-postulados-xofertas',
  templateUrl: './listar-postulados-xofertas.component.html',
  styleUrls: ['./listar-postulados-xofertas.component.css']
})

export class ListarPostuladosXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      
      lstVehiculos : Vehiculos[]=[];
      lstOfertas : Ofertas[]=[];
      lstpostuladosxofertas:PostuladosXOfertas[]=[];
      lstpostuladosxofertasTodos:PostuladosXOfertas[]=[];
      dataSource!: MatTableDataSource<PostuladosXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idOferta','idVehiculo', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.postuladosxofertasService.GetAll().subscribe({
           next : (datapostuladosxofertas:PostuladosXOfertas[]) => {
            this.lstpostuladosxofertasTodos = datapostuladosxofertas;
            this.lstpostuladosxofertas = datapostuladosxofertas;
            this.dataSource = new MatTableDataSource(datapostuladosxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
     ///   this.lstpostuladosxofertas = this.lstpostuladosxofertasTodos.filter(
     //       (val) => (
     //         ((val.nombrePostuladoXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstpostuladosxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstpostuladosxofertas.length;
        
      }
    
      ngOnInit() {
        
        this.listarVehiculos();
        this.listarOfertas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
      
      

      encontrarNombreVehiculo(idVehiculo:number):string{
        let vehiculo:string="";
        this.lstVehiculos.forEach(element => {
          if(element.idVehiculo==idVehiculo){
            vehiculo=element.placaVehiculo;
          }
        });
        return vehiculo;
      }

      listarVehiculos(){
        this.vehiculosService.GetAll().subscribe({
          next : (lstvehiculos:Vehiculos[]) => {
            this.lstVehiculos=lstvehiculos;
          }
        });
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

      listarOfertas(){
        this.ofertasService.GetAll().subscribe({
          next : (lstofertas:Ofertas[]) => {
            this.lstOfertas=lstofertas;
          }
        });
      }


    
      AbrirModalPostuladoXOferta(idPostuladoXOferta:number){
        const dialogRef = this.modalService.open(PostuladosXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idPostuladoXOferta=idPostuladoXOferta;
        dialogRef.componentInstance.asignarid(idPostuladoXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idPostuladoXOferta:number){
        this.postuladosxofertasService.delete(idPostuladoXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private postuladosxofertasService: PostuladosXOfertasService,
       
        private vehiculosService: VehiculosService,
        private ofertasService: OfertasService,
        private modalService: MatDialog
        ) { }
    }  