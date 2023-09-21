import { Component, HostBinding, OnInit } from '@angular/core';
import { SidenavService } from './';
import { environment } from 'src/environments/environment';
import { Menus, MenusService } from '../menus';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  titulo = environment.NombreAplicacion;
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  lstMenus : Menus[] = [];
  constructor(
    public sidenavService: SidenavService,
    public menusService : MenusService,
    private overlay: OverlayContainer
    ) {}
  
  ngOnInit() {
    this.listarMenus();
    this.toggleControl.valueChanges.subscribe((darkMode) => {
        const darkClassName = 'darkMode';
        this.className = darkMode ? darkClassName : '';
        if (darkMode) {
          this.overlay.getContainerElement().classList.add(darkClassName);
        } else {
          this.overlay.getContainerElement().classList.remove(darkClassName);
        }
    });
           
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
