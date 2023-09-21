import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlesXPuntos , ControlesXPuntosComponent, ControlesXPuntosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeEmpresas, TiposDeEmpresasService } from '../../tipos-de-empresas';
import { TiposDePuntosDeControl, TiposDePuntosDeControlService } from '../../tipos-de-puntos-de-control';
import { Menus, MenusService } from '../../menus';
import { Adjuntos, AdjuntosService } from '../../adjuntos';

@Component({
  selector: 'app-listar-controles-xpuntos',
  templateUrl: './listar-controles-xpuntos.component.html',
  styleUrls: ['./listar-controles-xpuntos.component.scss']
})

export class ListarControlesXPuntosComponent implements OnInit {
      arraypaginator=environment.paginator;
      lsttiposdeempresas : TiposDeEmpresas[]=[];
      lsttiposdepuntosdecontrol : TiposDePuntosDeControl[]=[];
      lstmenus : Menus[]=[];
      lstadjuntos : Adjuntos[]=[];
      lstcontrolesxpuntos:ControlesXPuntos[]=[];
      lstcontrolesxpuntosTodos:ControlesXPuntos[]=[];
      dataSource!: MatTableDataSource<ControlesXPuntos>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombrecontrolxpunto','valorcontrolxpunto','idTipoDeEmpresa', 'idTipoDePuntoDeControl' , 'idMenu','idAdjunto', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.controlesxpuntosService.GetAll().subscribe({
           next : (datacontrolesxpuntos:ControlesXPuntos[]) => {
            this.lstcontrolesxpuntosTodos = datacontrolesxpuntos;
            this.lstcontrolesxpuntos = datacontrolesxpuntos;
            this.dataSource = new MatTableDataSource(datacontrolesxpuntos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstcontrolesxpuntos = this.lstcontrolesxpuntosTodos.filter(
            (val) => (
              ((val.nombreControlXPunto ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstcontrolesxpuntos);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstcontrolesxpuntos.length;
        
      }
    
      ngOnInit() {
        this.listarTiposDeEmpresas();
        this.listarTiposDePuntosDeControl();
        this.listarMenus();
        this.listarAdjuntos();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreTipoDeEmpresa(idTipoDeEmpresa:number):string{
        let tipodeempresa:string="";
        this.lsttiposdeempresas.forEach(element => {
          if(element.idTipoDeEmpresa==idTipoDeEmpresa){
            tipodeempresa=element.nombreTipoDeEmpresa;
          }
        });
        return tipodeempresa;
      }
      encontrarNombreTipoDePuntoDeControl(idTipoDePuntoDeControl:number):string{
        let tipodepuntodecontrol:string="";
        this.lsttiposdepuntosdecontrol.forEach(element => {
          if(element.idTipoDePuntoDeControl==idTipoDePuntoDeControl){
            tipodepuntodecontrol=element.nombreTipoDePuntoDeControl;
          }
        });
        return tipodepuntodecontrol;
      }
      encontrarNombreMenu(idMenu:number):string{
        let menu:string="";
        this.lstmenus.forEach(element => {
          if(element.idMenu==idMenu){
            menu=element.nombre;
          }
        });
        return menu;
      }
      encontrarNombreAdjunto(idAdjunto:number):string{
        let adjunto:string="";
        this.lstadjuntos.forEach(element => {
          if(element.idAdjunto==idAdjunto){
            adjunto=element.nombreAdjunto;
          }
        });
        return adjunto;
      }
      
      listarTiposDeEmpresas(){ 
        this.tiposdeempresasService.GetAll().subscribe({
          next : (lsttiposdeempresas:TiposDeEmpresas[]) => { 
            this.lsttiposdeempresas=lsttiposdeempresas;
          }
        });
      }

      listarTiposDePuntosDeControl(){
        this.tiposdepuntosdecontrolService.GetAll().subscribe({
          next : (lsttiposdepuntosdecontrol:TiposDePuntosDeControl[]) => {
            this.lsttiposdepuntosdecontrol=lsttiposdepuntosdecontrol;
          }
        });
      }

      listarMenus(){
        this.menusService.GetAll().subscribe({
          next : (lstmenus:Menus[]) => {
            this.lstmenus=lstmenus;
          }
        });
      }

      listarAdjuntos(){
        this.adjuntosService.GetAll().subscribe({
          next : (lstadjuntos:Adjuntos[]) => {
            this.lstadjuntos=lstadjuntos;
          }
        });
      }

    
      AbrirModalControlXPunto(idControlXPunto:number){
        const dialogRef = this.modalService.open(ControlesXPuntosComponent).updateSize('80%');
            
        dialogRef.componentInstance.idControlXPunto=idControlXPunto;
        dialogRef.componentInstance.asignarid(idControlXPunto);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idControlXPunto:number){
        this.controlesxpuntosService.delete(idControlXPunto.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private controlesxpuntosService: ControlesXPuntosService,
        private tiposdeempresasService: TiposDeEmpresasService,
        private adjuntosService: AdjuntosService,
        private tiposdepuntosdecontrolService: TiposDePuntosDeControlService,
        private menusService: MenusService,
        private modalService: MatDialog
        ) { }
    }  