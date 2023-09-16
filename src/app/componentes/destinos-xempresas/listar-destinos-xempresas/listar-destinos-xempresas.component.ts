import { Component, OnInit, ViewChild } from '@angular/core';
import { DestinosXEmpresas , DestinosXEmpresasComponent, DestinosXEmpresasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresas, EmpresasService } from '../../empresas';
import { Destinos, DestinosService } from '../../destinos';

@Component({
  selector: 'app-listar-destinos-xempresas',
  templateUrl: './listar-destinos-xempresas.component.html',
  styleUrls: ['./listar-destinos-xempresas.component.css']
})


export class ListarDestinosXEmpresasComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstEmpresas : Empresas[]=[];
      lstDestinos : Destinos[]=[];
      
      lstdestinosxempresas:DestinosXEmpresas[]=[];
      lstdestinosxempresasTodos:DestinosXEmpresas[]=[];
      dataSource!: MatTableDataSource<DestinosXEmpresas>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['idEmpresa','idDestino','idEmpresaSecundaria',  'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.destinosxempresasService.GetAll().subscribe({
           next : (datadestinosxempresas:DestinosXEmpresas[]) => {
            this.lstdestinosxempresasTodos = datadestinosxempresas;
            this.lstdestinosxempresas = datadestinosxempresas;
            this.dataSource = new MatTableDataSource(datadestinosxempresas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
  //      this.lstdestinosxempresas = this.lstdestinosxempresasTodos.filter(
  //          (val) => (
  //            ((val.nombreDestinoXEmpresa ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
  //      ));
        this.dataSource = new MatTableDataSource(this.lstdestinosxempresas);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstdestinosxempresas.length;
        
      }
    
      ngOnInit() {
        this.listarEmpresas();
        this.listarDestinos();
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

      
      listarDestinos(){
        this.destinosService.GetAll().subscribe({
          next : (lstdestinos:Destinos[]) => {
            this.lstDestinos=lstdestinos;
          }
        });
      }

          
      AbrirModalDestinoXEmpresa(idDestinoXEmpresa:number){
        const dialogRef = this.modalService.open(DestinosXEmpresasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idDestinoXEmpresa=idDestinoXEmpresa;
        dialogRef.componentInstance.asignarid(idDestinoXEmpresa);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idDestinoXEmpresa:number){
        this.destinosxempresasService.delete(idDestinoXEmpresa.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private destinosxempresasService: DestinosXEmpresasService,
        private empresasService: EmpresasService,
        private destinosService: DestinosService,
        private modalService: MatDialog
        ) { }
    }  