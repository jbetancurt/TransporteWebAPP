import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeAccionesEnDestinoDeLaRuta } from './tipos-de-acciones-en-destino-de-la-ruta.model';
import { TiposDeAccionesEnDestinoDeLaRutaService } from './tipos-de-acciones-en-destino-de-la-ruta.service';


@Component({
  selector: 'app-tipos-de-acciones-en-destino-de-la-ruta',
  templateUrl: './tipos-de-acciones-en-destino-de-la-ruta.component.html',
  styleUrls: ['./tipos-de-acciones-en-destino-de-la-ruta.component.css']
})

  
  
  export class TiposDeAccionesEnDestinoDeLaRutaComponent implements OnInit {
    
    onAdd = new EventEmitter(); 
    @Input() idTipoDeAccionEnDestinoDeLaRuta = 0;
    editar:boolean=false;
    //lsttiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]=[];
    FGAgregarTiposDeAccionesEnDestinoDeLaRuta : FormGroup = this.formBuilder.group({      
      nombretipodeaccionendestinodelaruta:new FormControl('',Validators.required),
      idTipoDeAccionEnDestinoDeLaRuta:new FormControl('0')
    });
  
    
    cargarNombresTiposDeAccionesEnDestinoDeLaRuta(tiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta){
      this.FGAgregarTiposDeAccionesEnDestinoDeLaRuta.patchValue({
        nombretipodeaccionendestinodelaruta:tiposdeaccionesendestinodelaruta.nombreTipoDeAccionEnDestinoDeLaRuta,
        idTipoDeAccionEnDestinoDeLaRuta:tiposdeaccionesendestinodelaruta.idTipoDeAccionEnDestinoDeLaRuta
      })
    }  
    public asignarid(idTipoDeAccionEnDestinoDeLaRuta:number){
      this.idTipoDeAccionEnDestinoDeLaRuta=idTipoDeAccionEnDestinoDeLaRuta;
      this.editar=true;
    }
  
    public AbrirInformacion()
    {
      if(this.idTipoDeAccionEnDestinoDeLaRuta>0)
      {
        this.tiposdeaccionesendestinodelarutaService.Get(this.idTipoDeAccionEnDestinoDeLaRuta.toString()).subscribe({
          next : (datatiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta) => {
            this.cargarNombresTiposDeAccionesEnDestinoDeLaRuta(datatiposdeaccionesendestinodelaruta);
          }
        });
      }
    }
  
    ngOnInit() {
      this.AbrirInformacion();
             
    }
  
    constructor(
      private formBuilder: FormBuilder, 
      private tiposdeaccionesendestinodelarutaService: TiposDeAccionesEnDestinoDeLaRutaService) { }
  
      crearTiposDeAccionesEnDestinoDeLaRuta(){
        let tiposdeaccionesendestinodelaruta : TiposDeAccionesEnDestinoDeLaRuta = new TiposDeAccionesEnDestinoDeLaRuta;
    
        
        //agregamos los datos del formulario a la tabla personas
        tiposdeaccionesendestinodelaruta.nombreTipoDeAccionEnDestinoDeLaRuta=this.FGAgregarTiposDeAccionesEnDestinoDeLaRuta.value.nombretipodeaccionendestinodelaruta;
        
        
       //suscrubimos la guardada de los datos en la tabla tiposdeaccionesendestinodelaruta
        this.tiposdeaccionesendestinodelarutaService.create(tiposdeaccionesendestinodelaruta).subscribe(
          data => {
            this.onAdd.emit();
          }
        ); 
        
      }
    
      editarTiposDeAccionesEnDestinoDeLaRuta(idTipoDeAccionEnDestinoDeLaRuta:number){
        let tiposdeaccionesendestinodelaruta : TiposDeAccionesEnDestinoDeLaRuta = new TiposDeAccionesEnDestinoDeLaRuta;
    
        tiposdeaccionesendestinodelaruta.idTipoDeAccionEnDestinoDeLaRuta=idTipoDeAccionEnDestinoDeLaRuta;
        //agregamos los datos del formulario a la tabla tiposdeaccionesendestinodelaruta
        tiposdeaccionesendestinodelaruta.nombreTipoDeAccionEnDestinoDeLaRuta=this.FGAgregarTiposDeAccionesEnDestinoDeLaRuta.value.nombretipodeaccionendestinodelaruta;
              
       //suscrubimos la guardada de los datos en la tabla tiposdeaccionesendestinodelaruta
        this.tiposdeaccionesendestinodelarutaService.Edit(tiposdeaccionesendestinodelaruta).subscribe(
          data => {
            this.onAdd.emit();
          }
        ); 
        
      }
  
      
    
      enviarDatos() : void{
        let fgTiposDeAccionesEnDestinoDeLaRuta=this.FGAgregarTiposDeAccionesEnDestinoDeLaRuta.value;
        this.tiposdeaccionesendestinodelarutaService.Get(fgTiposDeAccionesEnDestinoDeLaRuta.idTipoDeAccionEnDestinoDeLaRuta).subscribe({
          next : (datatiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta) => {
           if(datatiposdeaccionesendestinodelaruta.idTipoDeAccionEnDestinoDeLaRuta<=0){
            
            this.crearTiposDeAccionesEnDestinoDeLaRuta();
           }
           else if(datatiposdeaccionesendestinodelaruta.idTipoDeAccionEnDestinoDeLaRuta>0){
            
            this.editarTiposDeAccionesEnDestinoDeLaRuta(datatiposdeaccionesendestinodelaruta.idTipoDeAccionEnDestinoDeLaRuta);
           }
           
          }
        }); 
    
        
      }
    
  
  }
  