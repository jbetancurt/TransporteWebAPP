import { Component, OnInit, ViewChild } from '@angular/core';
  import { Menus , MenusComponent, MenusService } from '../';
  import { MatDialog } from '@angular/material/dialog';
  import { environment } from 'src/environments/environment';
  import { tap } from 'rxjs/operators';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-listar-menus',
  templateUrl: './listar-menus.component.html',
  styleUrls: ['./listar-menus.component.scss']
})


export class ListarMenusComponent implements OnInit {
      arraypaginator=environment.paginator;
      lstMenus : Menus[]=[];
      lstmenus:Menus[]=[];
      lstmenusTodos:Menus[]=[];
      dataSource!: MatTableDataSource<Menus>;
      collectionSize = 0;
      filtroBusqueda: string = "";
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = ['nombre','idMenuPadre', 'nombreController' ,'nombreAction' ,'esNodo','activo', 'editar', 'borrar'];
      public AbrirInformacion()
      {
            
         this.menusService.GetAll().subscribe({
           next : (datamenus:Menus[]) => {
            this.lstmenusTodos = datamenus;
            this.lstmenus = datamenus;
            this.dataSource = new MatTableDataSource(datamenus);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }
         });
      }
      search(e: any): void {
        let value = (<HTMLTextAreaElement>e.target).value;
        
        this.lstmenus = this.lstmenusTodos.filter(
            (val) => (
              ((val.nombre ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
        ));
        this.dataSource = new MatTableDataSource(this.lstmenus);
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
        this.collectionSize = this.lstmenus.length;
        
      }
    
      ngOnInit() {
        this.listarMenus();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombreMenuPadre(idMenuPadre:number):string{
        let menupadre:string="";
        this.lstMenus.forEach(element => {
          if(element.idMenuPadre==idMenuPadre){
            menupadre=element.nombre;
          }
        });
        return menupadre;
      }
      
      listarMenus(){ 
        this.menusService.GetAll().subscribe({
          next : (lstmenus:Menus[]) => { 
            this.lstMenus=lstmenus;
          }
        });
      }
    
      AbrirModalMenu(idMenu:number){
        const dialogRef = this.modalService.open(MenusComponent).updateSize('80%');
            
        dialogRef.componentInstance.idMenu=idMenu;
        dialogRef.componentInstance.asignarid(idMenu);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idMenu:number){
        this.menusService.delete(idMenu.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private menusService: MenusService,
        private modalService: MatDialog
        ) { }
    }  