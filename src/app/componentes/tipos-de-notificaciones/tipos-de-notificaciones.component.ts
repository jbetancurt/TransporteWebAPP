import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeNotificaciones } from './tipos-de-notificaciones.model';
import { TiposDeNotificacionesService } from './tipos-de-notificaciones.service';

@Component({
  selector: 'app-tipos-de-notificaciones',
  templateUrl: './tipos-de-notificaciones.component.html',
  styleUrls: ['./tipos-de-notificaciones.component.scss']
})


export class TiposDeNotificacionesComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idTipoDeNotificacion = 0;
editar:boolean=false;
//lsttiposdenotificaciones:TiposDeNotificaciones[]=[];
FGAgregarTiposDeNotificaciones : FormGroup = this.formBuilder.group({      
  nombreTipoDeNotificacion:new FormControl('',Validators.required),
  idTipoDeNotificacion:new FormControl('0')
});


cargarNombresTiposDeNotificaciones(tiposdenotificaciones:TiposDeNotificaciones){
  this.FGAgregarTiposDeNotificaciones.patchValue({
    nombreTipoDeNotificacion:tiposdenotificaciones.nombreTipoDeNotificacion,
    idTipoDeNotificacion:tiposdenotificaciones.idTipoDeNotificacion
  })
}  
public asignarid(idTipoDeNotificacion:number){
  this.idTipoDeNotificacion=idTipoDeNotificacion;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idTipoDeNotificacion>0)
  {
    this.tiposdenotificacionesService.Get(this.idTipoDeNotificacion.toString()).subscribe({
      next : (datatiposdenotificaciones:TiposDeNotificaciones) => {
        this.cargarNombresTiposDeNotificaciones(datatiposdenotificaciones);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private tiposdenotificacionesService: TiposDeNotificacionesService) { }

  crearTiposDeNotificaciones(){
    let tiposdenotificaciones : TiposDeNotificaciones = new TiposDeNotificaciones;

    
    //agregamos los datos del formulario a la tabla personas
    tiposdenotificaciones.nombreTipoDeNotificacion=this.FGAgregarTiposDeNotificaciones.value.nombreTipoDeNotificacion;
    
    
    //suscrubimos la guardada de los datos en la tabla tiposdenotificaciones
    this.tiposdenotificacionesService.create(tiposdenotificaciones).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarTiposDeNotificaciones(idTipoDeNotificacion:number){
    let tiposdenotificaciones : TiposDeNotificaciones = new TiposDeNotificaciones;

    tiposdenotificaciones.idTipoDeNotificacion=idTipoDeNotificacion;
    //agregamos los datos del formulario a la tabla tiposdenotificaciones
    tiposdenotificaciones.nombreTipoDeNotificacion=this.FGAgregarTiposDeNotificaciones.value.nombreTipoDeNotificacion;
          
    //suscrubimos la guardada de los datos en la tabla tiposdenotificaciones
    this.tiposdenotificacionesService.Edit(tiposdenotificaciones).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgTiposDeNotificaciones=this.FGAgregarTiposDeNotificaciones.value;
    this.tiposdenotificacionesService.Get(fgTiposDeNotificaciones.idTipoDeNotificacion).subscribe({
      next : (datatiposdenotificaciones:TiposDeNotificaciones) => {
        if(datatiposdenotificaciones.idTipoDeNotificacion<=0){
        
        this.crearTiposDeNotificaciones();
        }
        else if(datatiposdenotificaciones.idTipoDeNotificacion>0){
        
        this.editarTiposDeNotificaciones(datatiposdenotificaciones.idTipoDeNotificacion);
        }
        
      }
    }); 

    
  }

  
}