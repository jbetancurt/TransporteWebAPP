import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Ofertas , OfertasComponent, OfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { LugaresXOfertasComponent, LugaresXOfertasService } from '../../lugares-xofertas';
import { CarroceriasXTiposDeVehiculosXOfertas, CarroceriasXTiposDeVehiculosXOfertasService } from '../../carrocerias-xtipos-de-vehiculos-xofertas';
import { RequisitosXOfertasComponent, RequisitosXOfertasService } from '../../requisitos-xofertas';
import { CargasXOfertasComponent, CargasXOfertasService } from '../../cargas-xofertas';
import { EstadosDeLasOfertas, EstadosDeLasOfertasService } from '../../estados-de-las-ofertas';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../../tipos-orientaciones-de-la-oferta';
import { Plantillas_Ofertas, Plantillas_OfertasComponent } from '../../plantillas-ofertas';
import { firstValueFrom, forkJoin } from 'rxjs';
import { LoginService } from 'src/app/paginas/login';

@Component({
  selector: 'app-listar-ofertas',
  templateUrl: './listar-ofertas.component.html',
  styleUrls: ['./listar-ofertas.component.scss']
})



export class ListarOfertasComponent implements OnInit {
      idEmpresaLogueado = 0;
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
      
      
      displayedColumns: string[] = ['idEmpresa','idTipoOrientacionDeLaOferta','idEstadoDeLaOferta','tituloOferta','descripcionOferta','valorTotalDeLaOferta','fechaInicialOferta', 'fechaFinalOferta','editar', 'borrar','plantilla'];
      public AbrirInformacion()
      {
        
         this.ofertasService.ConsultarXIdEmpresa(this.idEmpresaLogueado.toString()).subscribe({
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

      
      abrirModalPlantillas(idOferta:number, tipoPlantilla:string){
        const dialogRef = this.modalService.open(Plantillas_OfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idOfertaACargar=idOferta;
        dialogRef.componentInstance.tipoPlantillaQueSeCreara=tipoPlantilla;
        //dialogRef.componentInstance.asignarid(dialogRef.componentInstance.idOfertaACargar);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
        
      
          //this.AbrirInformacion();
        });
       }


      
          


      accion2() {
        // Acción 2
      }
    
          
      ngOnInit() {
       
        let usr=this.loginservice.getUser();
        if (usr){
          this.idEmpresaLogueado=usr.idEmpresa;
        } 
        else{
          this.idEmpresaLogueado=2;
        }
            
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
        const dialogRef = this.modalService.open(OfertasComponent).updateSize('100%','100%');
            
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
          this.lugaresxofertaService.BorrarPorIdOferta(idOferta.toString()),
          this.carroceriasxtiposdevehiculosxofertasService.BorrarPorIdOferta(idOferta.toString()),
          this.requisitosxofertasService.BorrarPorIdOferta(idOferta.toString()),
          this.cargasxofertasService.BorrarPorIdOferta(idOferta.toString())
        ]).subscribe({
          next: () => {
            
            // Borra la oferta después de que se hayan borrado los lugares, requisitos y cargas
            this.ofertasService.delete(idOferta.toString()).subscribe({
              next: () => {
               
                this.AbrirInformacion();
              }
            });
          }
        });
      }

      constructor(
        private ofertasService: OfertasService,
        private empresasService: EmpresasService,
        private lugaresxofertaService: LugaresXOfertasService,
        private carroceriasxtiposdevehiculosxofertasService: CarroceriasXTiposDeVehiculosXOfertasService,
        private requisitosxofertasService: RequisitosXOfertasService,
        private cargasxofertasService: CargasXOfertasService,
        private estadosdelasofertasService: EstadosDeLasOfertasService,
        private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
        private modalService: MatDialog,
        private loginservice: LoginService,
        private dialog: MatDialog
        ) { }
    }  