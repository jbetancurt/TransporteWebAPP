import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosDeLasNotificaciones, } from './estados-de-las-notificaciones.model';
import { EstadosDeLasNotificacionesService } from './estados-de-las-notificaciones.service';


@Component({
  selector: 'app-estados-de-las-notificaciones',
  templateUrl: './estados-de-las-notificaciones.component.html',
  styleUrls: ['./estados-de-las-notificaciones.component.scss']
})

export class EstadosDeLasNotificacionesComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idEstadoDeLaNotificacion = 0;
editar:boolean=false;
//lstestadosdelasnotificaciones:EstadosDeLasNotificaciones[]=[];
FGAgregarEstadosDeLasNotificaciones : FormGroup = this.formBuilder.group({      
  nombreEstadoDeLaNotificacion:new FormControl('',Validators.required),
  idEstadoDeLaNotificacion:new FormControl('0')
});


cargarNombresEstadosDeLasNotificaciones(estadosdelasnotificaciones:EstadosDeLasNotificaciones){
  this.FGAgregarEstadosDeLasNotificaciones.patchValue({
    nombreEstadoDeLaNotificacion:estadosdelasnotificaciones.nombreEstadoDeLaNotificacion,
    idEstadoDeLaNotificacion:estadosdelasnotificaciones.idEstadoDeLaNotificacion
  })
}  
public asignarid(idEstadoDeLaNotificacion:number){
  this.idEstadoDeLaNotificacion=idEstadoDeLaNotificacion;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idEstadoDeLaNotificacion>0)
  {
    this.estadosdelasnotificacionesService.Get(this.idEstadoDeLaNotificacion.toString()).subscribe({
      next : (dataestadosdelasnotificaciones:EstadosDeLasNotificaciones) => {
        this.cargarNombresEstadosDeLasNotificaciones(dataestadosdelasnotificaciones);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private estadosdelasnotificacionesService: EstadosDeLasNotificacionesService) { }

  crearEstadosDeLasNotificaciones(){
    let estadosdelasnotificaciones : EstadosDeLasNotificaciones = new EstadosDeLasNotificaciones;

    
    //agregamos los datos del formulario a la tabla personas
    estadosdelasnotificaciones.nombreEstadoDeLaNotificacion=this.FGAgregarEstadosDeLasNotificaciones.value.nombreEstadoDeLaNotificacion;
    
    
    //suscrubimos la guardada de los datos en la tabla estadosdelasnotificaciones
    this.estadosdelasnotificacionesService.create(estadosdelasnotificaciones).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarEstadosDeLasNotificaciones(idEstadoDeLaNotificacion:number){
    let estadosdelasnotificaciones : EstadosDeLasNotificaciones = new EstadosDeLasNotificaciones;

    estadosdelasnotificaciones.idEstadoDeLaNotificacion=idEstadoDeLaNotificacion;
    //agregamos los datos del formulario a la tabla estadosdelasnotificaciones
    estadosdelasnotificaciones.nombreEstadoDeLaNotificacion=this.FGAgregarEstadosDeLasNotificaciones.value.nombreEstadoDeLaNotificacion;
          
    //suscrubimos la guardada de los datos en la tabla estadosdelasnotificaciones
    this.estadosdelasnotificacionesService.Edit(estadosdelasnotificaciones).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgEstadosDeLasNotificaciones=this.FGAgregarEstadosDeLasNotificaciones.value;
    this.estadosdelasnotificacionesService.Get(fgEstadosDeLasNotificaciones.idEstadoDeLaNotificacion).subscribe({
      next : (dataestadosdelasnotificaciones:EstadosDeLasNotificaciones) => {
        if(dataestadosdelasnotificaciones.idEstadoDeLaNotificacion<=0){
        
        this.crearEstadosDeLasNotificaciones();
        }
        else if(dataestadosdelasnotificaciones.idEstadoDeLaNotificacion>0){
        
        this.editarEstadosDeLasNotificaciones(dataestadosdelasnotificaciones.idEstadoDeLaNotificacion);
        }
        
      }
    }); 

    
  }

  
}