import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Ofertas , OfertasComponent, OfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { EstadosDeLasOfertas, EstadosDeLasOfertasService } from '../../estados-de-las-ofertas';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../../tipos-orientaciones-de-la-oferta';

@Component({
  selector: 'app-listar-ofertas',
  templateUrl: './listar-ofertas.component.html',
  styleUrls: ['./listar-ofertas.component.scss']
})



export class ListarOfertasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstEstadosDeLasOfertas : EstadosDeLasOfertas[]=[];
      lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
      lstofertas:Ofertas[]=[];
      lstofertasTodos:Ofertas[]=[];
      dataSource!: MatTableDataSource<Ofertas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      @Input() idOfertaInput: string = "";
      
      displayedColumns: string[] = ['idEmpresa','idTipoOrientacionDeLaOferta','idEstadoDeLaOferta','tituloOferta' ,'fechaInicialOferta', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.ofertasService.GetAll().subscribe({
           next : (dataofertas:Ofertas[]) => {
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
              ((val.tituloOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstofertas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstofertas.length;
        
      }
    
      ngOnInit() {
        console.log(this.idOfertaInput);
        
        this.listarEmpresas();
        this.listarEstadosDeLasOfertas();
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

      encontrarNombreEstadoDeLaOferta(idEstadoDeLaOferta:number):string{
        let estadodelaoferta:string="";
        this.lstEstadosDeLasOfertas.forEach(element => {
          if(element.idEstadoDeLaOferta==idEstadoDeLaOferta){
            estadodelaoferta=element.nombreEstadoDeLaOferta;
          }
        });
        return estadodelaoferta;
      }

      listarEstadosDeLasOfertas(){
        this.estadosdelasofertasService.GetAll().subscribe({
          next : (lstestadosdelasofertas:EstadosDeLasOfertas[]) => {
            this.lstEstadosDeLasOfertas=lstestadosdelasofertas;
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


    
      AbrirModalOferta(idOferta:number){
        const dialogRef = this.modalService.open(OfertasComponent).updateSize('80%');
            
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
        this.ofertasService.delete(idOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private ofertasService: OfertasService,
        private empresasService: EmpresasService,
        private estadosdelasofertasService: EstadosDeLasOfertasService,
        private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
        private modalService: MatDialog
        ) { }
    }  