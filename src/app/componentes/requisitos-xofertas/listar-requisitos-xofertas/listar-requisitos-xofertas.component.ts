import { Component, OnInit, ViewChild } from '@angular/core';
import { RequisitosXOfertas , RequisitosXOfertasComponent, RequisitosXOfertasService} from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Requisitos, RequisitosService } from '../../requisitos';
import { Ofertas, OfertasService } from '../../ofertas';


@Component({
  selector: 'app-listar-requisitos-xofertas',
  templateUrl: './listar-requisitos-xofertas.component.html',
  styleUrls: ['./listar-requisitos-xofertas.component.scss']
})

export class ListarRequisitosXOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstRequisitos : Requisitos[]=[];
      lstOfertas : Ofertas[]=[];
     
      lstrequisitosxofertas:RequisitosXOfertas[]=[];
      lstrequisitosxofertasTodos:RequisitosXOfertas[]=[];
      dataSource!: MatTableDataSource<RequisitosXOfertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idOferta','idRequisito','requeridoRequisitoXOferta', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.requisitosxofertasServices.GetAll().subscribe({
           next : (datarequisitosxofertas:RequisitosXOfertas[]) => {
            this.lstrequisitosxofertasTodos = datarequisitosxofertas;
            this.lstrequisitosxofertas = datarequisitosxofertas;
            this.dataSource = new MatTableDataSource(datarequisitosxofertas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
      //  this.lstrequisitosxofertas = this.lstrequisitosxofertasTodos.filter(
      //     (val) => (
     //        ((val.tituloPlantillaRequisitoXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
     //   ));
        this.dataSource = new MatTableDataSource(this.lstrequisitosxofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstrequisitosxofertas.length;
        
      }
    
      ngOnInit() {
        this.listarRequisitos();
        this.listarOfertas();
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

      


    
      AbrirModalRequisitoXOferta(idRequisitoXOferta:number){
        const dialogRef = this.modalService.open(RequisitosXOfertasComponent).updateSize('80%');
            
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
        this.requisitosxofertasServices.delete(idRequisitoXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private requisitosxofertasServices: RequisitosXOfertasService,
        private requisitosService: RequisitosService,
        private ofertasService: OfertasService,
        private modalService: MatDialog
        ) { }
    }  