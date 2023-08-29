import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDePuntosDeControl } from './tipos-de-puntos-de-control.model';
import { TiposDePuntosDeControlService } from './tipos-de-puntos-de-control.service';

@Component({
  selector: 'app-tipos-de-puntos-de-control',
  templateUrl: './tipos-de-puntos-de-control.component.html',
  styleUrls: ['./tipos-de-puntos-de-control.component.css']
})
export class TiposDePuntosDeControlComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDePuntoDeControl = 0;
  editar:boolean=false;
  //lsttiposdepuntosdecontrol:TiposDePuntosDeControl[]=[];
  FGAgregarTiposDePuntosDeControl : FormGroup = this.formBuilder.group({      
    nombretipodepuntodecontrol:new FormControl('',Validators.required),
    idTipoDePuntoDeControl:new FormControl('0')
  });
  
  
  cargarNombresTiposDePuntosDeControl(tiposdepuntosdecontrol:TiposDePuntosDeControl){
    this.FGAgregarTiposDePuntosDeControl.patchValue({
      nombretipodepuntodecontrol:tiposdepuntosdecontrol.nombreTipoDePuntoDeControl,
      idTipoDePuntoDeControl:tiposdepuntosdecontrol.idTipoDePuntoDeControl
    })
  }  
  public asignarid(idTipoDePuntoDeControl:number){
    this.idTipoDePuntoDeControl=idTipoDePuntoDeControl;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idTipoDePuntoDeControl>0)
    {
      this.tiposdepuntosdecontrolService.Get(this.idTipoDePuntoDeControl.toString()).subscribe({
        next : (datatiposdepuntosdecontrol:TiposDePuntosDeControl) => {
          this.cargarNombresTiposDePuntosDeControl(datatiposdepuntosdecontrol);
        }
      });
    }
  }
  
  ngOnInit() {
    this.AbrirInformacion();
            
  }
  
  constructor(
    private formBuilder: FormBuilder, 
    private tiposdepuntosdecontrolService: TiposDePuntosDeControlService) { }
  
    crearTiposDePuntosDeControl(){
      let tiposdepuntosdecontrol : TiposDePuntosDeControl = new TiposDePuntosDeControl;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposdepuntosdecontrol.nombreTipoDePuntoDeControl=this.FGAgregarTiposDePuntosDeControl.value.nombretipodepuntodecontrol;
      
      
      //suscrubimos la guardada de los datos en la tabla tiposdepuntosdecontrol
      this.tiposdepuntosdecontrolService.create(tiposdepuntosdecontrol).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDePuntosDeControl(idTipoDePuntoDeControl:number){
      let tiposdepuntosdecontrol : TiposDePuntosDeControl = new TiposDePuntosDeControl;
  
      tiposdepuntosdecontrol.idTipoDePuntoDeControl=idTipoDePuntoDeControl;
      //agregamos los datos del formulario a la tabla tiposdepuntosdecontrol
      tiposdepuntosdecontrol.nombreTipoDePuntoDeControl=this.FGAgregarTiposDePuntosDeControl.value.nombretipodepuntodecontrol;
            
      //suscrubimos la guardada de los datos en la tabla tiposdepuntosdecontrol
      this.tiposdepuntosdecontrolService.Edit(tiposdepuntosdecontrol).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    
  
    enviarDatos() : void{
      let fgTiposDePuntosDeControl=this.FGAgregarTiposDePuntosDeControl.value;
      this.tiposdepuntosdecontrolService.Get(fgTiposDePuntosDeControl.idTipoDePuntoDeControl).subscribe({
        next : (datatiposdepuntosdecontrol:TiposDePuntosDeControl) => {
          if(datatiposdepuntosdecontrol.idTipoDePuntoDeControl<=0){
          
          this.crearTiposDePuntosDeControl();
          }
          else if(datatiposdepuntosdecontrol.idTipoDePuntoDeControl>0){
          
          this.editarTiposDePuntosDeControl(datatiposdepuntosdecontrol.idTipoDePuntoDeControl);
          }
          
        }
      }); 
  
      
    }
  
    
  }