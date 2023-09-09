import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlesXPuntos, ControlesXPuntosService } from './';
import { TiposDeEmpresas, TiposDeEmpresasService } from '../tipos-de-empresas';
import { Adjuntos, AdjuntosService } from '../adjuntos';
import { TiposDePuntosDeControl, TiposDePuntosDeControlService } from '../tipos-de-puntos-de-control';
import { Menus, MenusService } from '../menus';

@Component({
  selector: 'app-controles-xpuntos',
  templateUrl: './controles-xpuntos.component.html',
  styleUrls: ['./controles-xpuntos.component.css']
})

export class ControlesXPuntosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idControlXPunto = 0;
  editar:boolean=false;
  lstTiposDeEmpresas:TiposDeEmpresas[]=[];
  lstAdjuntos:Adjuntos[]=[];
  lstTiposDePuntosDeControl:TiposDePuntosDeControl[]=[];
  lstMenus:Menus[]=[];
  FGAgregarControlesXPuntos : FormGroup = this.formBuilder.group({      
    idControlXPunto:new FormControl('0',Validators.required),
    idTipoDeEmpresa:new FormControl('1',Validators.required),
    idAdjunto:new FormControl('',Validators.required),
    idTipoDePuntoDeControl:new FormControl('',Validators.required),
    idMenu:new FormControl('',Validators.required),
    nombrecontrolxpunto:new FormControl('',Validators.required),
    valorcontrolxpunto:new FormControl('',Validators.required),
  });

  
  cargarNombresControlesXPuntos(controlesxpuntos:ControlesXPuntos){
    this.FGAgregarControlesXPuntos.patchValue({
      idControlXPunto:controlesxpuntos.idControlXPunto,
      idTipoDeEmpresa : controlesxpuntos.idTipoDeEmpresa,
      idAdjunto:controlesxpuntos.idAdjunto,
      idTipoDePuntoDeControl:controlesxpuntos.idTipoDePuntoDeControl,
      idMenu:controlesxpuntos.idMenu,
      nombrecontrolxpunto:controlesxpuntos.nombreControlXPunto,
      valorcontrolxpunto:controlesxpuntos.valorControlXPunto
    })
  }  
  public asignarid(idControlXPunto:number){
    this.idControlXPunto=idControlXPunto;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idControlXPunto>0)
    {
      this.controlesxpuntosService.Get(this.idControlXPunto.toString()).subscribe({
        next : (datacontrolesxpuntos:ControlesXPuntos) => {
          this.cargarNombresControlesXPuntos(datacontrolesxpuntos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposDeEmpresas();
    this.listarAdjuntos();
    this.listarTiposDePuntosDeControl();
    this.listarMenus();
           
  }

  constructor(
    private tiposdeempresasService: TiposDeEmpresasService,
    private adjuntosService: AdjuntosService,
    private tiposdepuntosdecontrolService: TiposDePuntosDeControlService,
    private menusService: MenusService,
    private formBuilder: FormBuilder, 
    private controlesxpuntosService: ControlesXPuntosService) { }

    crearControlesXPuntos(){
      let controlesxpuntos : ControlesXPuntos = new ControlesXPuntos;
  
      
      //agregamos los datos del formulario a la tabla personas
      controlesxpuntos.idControlXPunto=this.FGAgregarControlesXPuntos.value.idControlXPunto;
      controlesxpuntos.idTipoDeEmpresa=this.FGAgregarControlesXPuntos.value.idTipoDeEmpresa;
      controlesxpuntos.idAdjunto=this.FGAgregarControlesXPuntos.value.idAdjunto;
      controlesxpuntos.idTipoDePuntoDeControl=this.FGAgregarControlesXPuntos.value.idTipoDePuntoDeControl;
      controlesxpuntos.idMenu=this.FGAgregarControlesXPuntos.value.idMenu;
      controlesxpuntos.nombreControlXPunto=this.FGAgregarControlesXPuntos.value.nombrecontrolxpunto;
      controlesxpuntos.valorControlXPunto=this.FGAgregarControlesXPuntos.value.valorcontrolxpunto;
      
     //suscrubimos la guardada de los datos en la tabla controlesxpuntos
      this.controlesxpuntosService.create(controlesxpuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarTiposDeEmpresas(){ 
      this.tiposdeempresasService.GetAll().subscribe({
        next : (lsttiposdeempresas:TiposDeEmpresas[]) => { 
          this.lstTiposDeEmpresas=lsttiposdeempresas;
        }
      });
    }

    listarAdjuntos(){ 
      this.adjuntosService.GetAll().subscribe({
        next : (lstadjuntos:Adjuntos[]) => { 
          this.lstAdjuntos=lstadjuntos;
        }
      });
    }

    listarTiposDePuntosDeControl(){
      this.tiposdepuntosdecontrolService.GetAll().subscribe({
        next : (lsttiposdepuntosdecontrol:TiposDePuntosDeControl[]) => {
          this.lstTiposDePuntosDeControl=lsttiposdepuntosdecontrol;
        }
      });
    }

    listarMenus(){
      this.menusService.GetAll().subscribe({
        next : (lstmenus:Menus[]) => {
          this.lstMenus=lstmenus;
        }
      });
    }
  
    editarControlesXPuntos(idControlXPunto:number){
      let controlesxpuntos : ControlesXPuntos = new ControlesXPuntos;
  
      //agregamos los datos del formulario a la tabla controlesxpuntos
      controlesxpuntos.idControlXPunto=idControlXPunto;
      controlesxpuntos.idTipoDeEmpresa=this.FGAgregarControlesXPuntos.value.idTipoDeEmpresa;
      controlesxpuntos.idAdjunto=this.FGAgregarControlesXPuntos.value.idAdjunto;
      controlesxpuntos.idTipoDePuntoDeControl=this.FGAgregarControlesXPuntos.value.idTipoDePuntoDeControl;
      controlesxpuntos.idMenu=this.FGAgregarControlesXPuntos.value.idMenu;
      controlesxpuntos.nombreControlXPunto=this.FGAgregarControlesXPuntos.value.nombrecontrolxpunto;
      controlesxpuntos.valorControlXPunto=this.FGAgregarControlesXPuntos.value.valorcontrolxpunto;
       
      //suscrubimos la guardada de los datos en la tabla controlesxpuntos
      this.controlesxpuntosService.Edit(controlesxpuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgControlesXPuntos=this.FGAgregarControlesXPuntos.value;
      this.controlesxpuntosService.Get(fgControlesXPuntos.idControlXPunto).subscribe({
        next : (datacontrolesxpuntos:ControlesXPuntos) => {
         if(datacontrolesxpuntos.idControlXPunto<=0){
          
          this.crearControlesXPuntos();
         }
         else if(datacontrolesxpuntos.idControlXPunto>0){
          
          this.editarControlesXPuntos(datacontrolesxpuntos.idControlXPunto);
         }
         
        }
      }); 
  
      
    }
  

}
