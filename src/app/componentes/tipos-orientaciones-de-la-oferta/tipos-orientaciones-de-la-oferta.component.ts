

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
  @Input() idTipoOrientacionOferta = 0;
  editar:boolean=false;
  //lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]=[];
  FGAgregarTiposOrientacionesDeLaOferta : FormGroup = this.formBuilder.group({      
    nombretipoorientacionoferta:new FormControl('',Validators.required),
    idTipoOrientacionOferta:new FormControl('0')
  });

  
  cargarNombresTiposOrientacionesDeLaOferta(tiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta){
    this.FGAgregarTiposOrientacionesDeLaOferta.patchValue({
      nombretipoorientacionoferta:tiposorientacionesdelaoferta.nombreTipoOrientacionOferta,
      idTipoOrientacionOferta:tiposorientacionesdelaoferta.idTipoOrientacionOferta
    })
  }  
  public asignarid(idTipoOrientacionOferta:number){
    this.idTipoOrientacionOferta=idTipoOrientacionOferta;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoOrientacionOferta>0)
    {
      this.tiposorientacionesdelaofertaService.Get(this.idTipoOrientacionOferta.toString()).subscribe({
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
      tiposorientacionesdelaoferta.nombreTipoOrientacionOferta=this.FGAgregarTiposOrientacionesDeLaOferta.value.nombretipoorientacionoferta;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposorientacionesdelaoferta
      this.tiposorientacionesdelaofertaService.create(tiposorientacionesdelaoferta).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposOrientacionesDeLaOferta(idTipoOrientacionOferta:number){
      let tiposorientacionesdelaoferta : TiposOrientacionesDeLaOferta = new TiposOrientacionesDeLaOferta;
  
      tiposorientacionesdelaoferta.idTipoOrientacionOferta=idTipoOrientacionOferta;
      //agregamos los datos del formulario a la tabla tiposorientacionesdelaoferta
      tiposorientacionesdelaoferta.nombreTipoOrientacionOferta=this.FGAgregarTiposOrientacionesDeLaOferta.value.nombretipoorientacionoferta;
            
     //suscrubimos la guardada de los datos en la tabla tiposorientacionesdelaoferta
      this.tiposorientacionesdelaofertaService.Edit(tiposorientacionesdelaoferta).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
  
    enviarDatos() : void{
      let fgTiposOrientacionesDeLaOferta=this.FGAgregarTiposOrientacionesDeLaOferta.value;
      this.tiposorientacionesdelaofertaService.Get(fgTiposOrientacionesDeLaOferta.idTipoOrientacionOferta).subscribe({
        next : (datatiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta) => {
         if(datatiposorientacionesdelaoferta.idTipoOrientacionOferta<=0){
          
          this.crearTiposOrientacionesDeLaOferta();
         }
         else if(datatiposorientacionesdelaoferta.idTipoOrientacionOferta>0){
          
          this.editarTiposOrientacionesDeLaOferta(datatiposorientacionesdelaoferta.idTipoOrientacionOferta);
         }
         
        }
      }); 
       
    }
}

