

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposOrientacionesDeLaOferta } from './tipos-orientaciones-de-la-oferta.model';
import { TiposOrientacionesDeLaOfertaService } from './tipos-orientaciones-de-la-oferta.service';

@Component({
  selector: 'app-tipos-orientaciones-de-la-oferta',
  templateUrl: './tipos-orientaciones-de-la-oferta.component.html',
  styleUrls: ['./tipos-orientaciones-de-la-oferta.component.css']
})
export class TiposOrientacionesDeLaOfertaComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoOrientacionDeLaOferta = 0;
  editar:boolean=false;
  //lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]=[];
  FGAgregarTiposOrientacionesDeLaOferta : FormGroup = this.formBuilder.group({      
    nombretipoorientaciondelaoferta:new FormControl('',Validators.required),
    idTipoOrientacionDeLaOferta:new FormControl('0')
  });

  
  cargarNombresTiposOrientacionesDeLaOferta(tiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta){
    this.FGAgregarTiposOrientacionesDeLaOferta.patchValue({
      nombretipoorientaciondelaoferta:tiposorientacionesdelaoferta.nombreTipoOrientacionDeLaOferta,
      idTipoOrientacionDeLaOferta:tiposorientacionesdelaoferta.idTipoOrientacionDeLaOferta
    })
  }  
  public asignarid(idTipoOrientacionDeLaOferta:number){
    this.idTipoOrientacionDeLaOferta=idTipoOrientacionDeLaOferta;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoOrientacionDeLaOferta>0)
    {
      this.tiposorientacionesdelaofertaService.Get(this.idTipoOrientacionDeLaOferta.toString()).subscribe({
        next : (datatiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta) => {
          this.cargarNombresTiposOrientacionesDeLaOferta(datatiposorientacionesdelaoferta);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService) { }

    crearTiposOrientacionesDeLaOferta(){
      let tiposorientacionesdelaoferta : TiposOrientacionesDeLaOferta = new TiposOrientacionesDeLaOferta;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposorientacionesdelaoferta.nombreTipoOrientacionDeLaOferta=this.FGAgregarTiposOrientacionesDeLaOferta.value.nombretipoorientaciondelaoferta;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposorientacionesdelaoferta
      this.tiposorientacionesdelaofertaService.create(tiposorientacionesdelaoferta).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposOrientacionesDeLaOferta(idTipoOrientacionDeLaOferta:number){
      let tiposorientacionesdelaoferta : TiposOrientacionesDeLaOferta = new TiposOrientacionesDeLaOferta;
  
      tiposorientacionesdelaoferta.idTipoOrientacionDeLaOferta=idTipoOrientacionDeLaOferta;
      //agregamos los datos del formulario a la tabla tiposorientacionesdelaoferta
      tiposorientacionesdelaoferta.nombreTipoOrientacionDeLaOferta=this.FGAgregarTiposOrientacionesDeLaOferta.value.nombretipoorientaciondelaoferta;
            
     //suscrubimos la guardada de los datos en la tabla tiposorientacionesdelaoferta
      this.tiposorientacionesdelaofertaService.Edit(tiposorientacionesdelaoferta).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposOrientacionesDeLaOferta=this.FGAgregarTiposOrientacionesDeLaOferta.value;
      this.tiposorientacionesdelaofertaService.Get(fgTiposOrientacionesDeLaOferta.idTipoOrientacionDeLaOferta).subscribe({
        next : (datatiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta) => {
         if(datatiposorientacionesdelaoferta.idTipoOrientacionDeLaOferta<=0){
          
          this.crearTiposOrientacionesDeLaOferta();
         }
         else if(datatiposorientacionesdelaoferta.idTipoOrientacionDeLaOferta>0){
          
          this.editarTiposOrientacionesDeLaOferta(datatiposorientacionesdelaoferta.idTipoOrientacionDeLaOferta);
         }
         
        }
      }); 
  
      
    }
  

}

