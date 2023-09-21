import { Component, OnInit, ViewChild } from '@angular/core';
  import { TiposDePuntosDeControl , TiposDePuntosDeControlComponent, TiposDePuntosDeControlService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-listar-tipos-de-puntos-de-control',
  templateUrl: './listar-tipos-de-puntos-de-control.component.html',
  styleUrls: ['./listar-tipos-de-puntos-de-control.component.scss']
})
    export class ListarTiposDePuntosDeControlComponent implements OnInit {
      arraypaginator=environment.paginator;
      lsttiposdepuntosdecontrol:TiposDePuntosDeControl[]=[];
      lsttiposdepuntosdecontrolTodos:TiposDePuntosDeControl[]=[];
      dataSource!: MatTableDataSource<TiposDePuntosDeControl>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.tiposdepuntosdecontrolService.GetAll().subscribe({
           next : (datatiposdepuntosdecontrol:TiposDePuntosDeControl[]) => {
            this.lsttiposdepuntosdecontrolTodos = datatiposdepuntosdecontrol;
            this.lsttiposdepuntosdecontrol = datatiposdepuntosdecontrol;
            this.dataSource = new MatTableDataSource(datatiposdepuntosdecontrol);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lsttiposdepuntosdecontrol = this.lsttiposdepuntosdecontrolTodos.filter(
            (val) => (
              ((val.nombreTipoDePuntoDeControl ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lsttiposdepuntosdecontrol);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lsttiposdepuntosdecontrol.length;
        
      }
    
      ngOnInit() {
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      
    
      AbrirModalTipoDePuntoDeControl(idTipoDePuntoDeControl:number){
        const dialogRef = this.modalService.open(TiposDePuntosDeControlComponent).updateSize('80%');
            
        dialogRef.componentInstance.idTipoDePuntoDeControl=idTipoDePuntoDeControl;
        dialogRef.componentInstance.asignarid(idTipoDePuntoDeControl);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idTipoDePuntoDeControl:number){
        this.tiposdepuntosdecontrolService.delete(idTipoDePuntoDeControl.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(private tiposdepuntosdecontrolService: TiposDePuntosDeControlService,
        private modalService: MatDialog) { }
    }  
  