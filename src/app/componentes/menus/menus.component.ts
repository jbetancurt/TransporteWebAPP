import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Menus, MenusService } from './';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})

export class MenusComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idMenu = 0;
  editar:boolean=false;
  lstMenus:Menus[]=[];
  
  //lstmenus:Menus[]=[];
  FGAgregarMenus : FormGroup = this.formBuilder.group({      
    idMenu:new FormControl('0'),
    idMenuPadre:new FormControl('0'),
    nombre:new FormControl('',Validators.required),
    nombreController:new FormControl('',Validators.required),
    nombreAction:new FormControl('',Validators.required),
    esNodo:false,
    activo:false
  });

  
  cargarNombresMenus(menus:Menus){
    this.FGAgregarMenus.patchValue({
      idMenu:menus.idMenu,
      idMenuPadre : menus.idMenuPadre,
      nombre:menus.nombre,
      nombreController:menus.nombreController,
      nombreAction:menus.nombreAction,
      esNodo:menus.esNodo,
      activo:menus.activo
    })
  }  
  public asignarid(idMenu:number){
    this.idMenu=idMenu;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idMenu>0)
    {
      this.menusService.Get(this.idMenu.toString()).subscribe({
        next : (datamenus:Menus) => {
          this.cargarNombresMenus(datamenus);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarMenus();
  
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private menusService: MenusService) { }

    crearMenus(){
      let menus : Menus = new Menus;
  
      
      //agregamos los datos del formulario a la tabla personas
      menus.idMenu=this.FGAgregarMenus.value.idMenu;
      menus.idMenuPadre=this.FGAgregarMenus.value.idMenuPadre;
      menus.nombre=this.FGAgregarMenus.value.nombre;
      menus.nombreController=this.FGAgregarMenus.value.nombreController;
      menus.nombreAction=this.FGAgregarMenus.value.nombreAction;
      menus.esNodo=this.FGAgregarMenus.value.esNodo;
      menus.activo=this.FGAgregarMenus.value.activo;
      
     //suscrubimos la guardada de los datos en la tabla menus
      this.menusService.create(menus).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    listarMenus(){
      this.menusService.GetAll().subscribe({
        next : (lstMenus:Menus[]) => {
          this.lstMenus=lstMenus.filter(x => x.esNodo && x.activo);
        }
      });
    }

        
  
    editarMenus(idMenu:number){
      let menus : Menus = new Menus;
      
  
      menus.idMenu=idMenu;
      menus.idMenuPadre=this.FGAgregarMenus.value.idMenuPadre;
      menus.nombre=this.FGAgregarMenus.value.nombre;
      menus.nombreController=this.FGAgregarMenus.value.nombreController;
      menus.nombreAction=this.FGAgregarMenus.value.nombreAction;
      menus.esNodo=this.FGAgregarMenus.value.esNodo;
      menus.activo=this.FGAgregarMenus.value.activo;
            
           
    
      //suscrubimos la guardada de los datos en la tabla menus
      this.menusService.Edit(menus).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgMenus=this.FGAgregarMenus.value;
      this.menusService.Get(fgMenus.idMenu).subscribe({
        next : (datamenus:Menus) => {
         if(datamenus.idMenu<=0){
          
          this.crearMenus();
         }
         else if(datamenus.idMenu>0){
          
          this.editarMenus(datamenus.idMenu);
         }
         
        }
      }); 
  
      
    }
  

}
