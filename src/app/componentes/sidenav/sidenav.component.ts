import { Component, OnInit } from '@angular/core';
import { SidenavService } from './';
import { environment } from 'src/environments/environment';
import { Menus, MenusService } from '../menus';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  titulo = environment.NombreAplicacion;
  lstMenus : Menus[] = [];
  constructor(
    public sidenavService: SidenavService,
    public menusService : MenusService
    ) {}
  
  ngOnInit() {
    this.listarMenus();
    
           
  }
  filtrarMenu(idPadre? : number) :Menus[]{    
    if (this.lstMenus.length > 0)
    {
      if (idPadre == 0){
        return this.lstMenus.filter(x => x.idMenuPadre == null);
      }
      else{
        return this.lstMenus.filter(x => x.idMenuPadre == idPadre);
      }
    }
    else
    {
      return [];
    }
  }
  listarMenus(){ 
    this.menusService.GetAll().subscribe({
      next : (lstmenus:Menus[]) => { 
        this.lstMenus=lstmenus;
      }
    });
  }

}
