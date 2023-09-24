import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeLugaresXOfertas } from './tipos-de-lugares-xofertas.model';
import { TiposDeLugaresXOfertasService } from './tipos-de-lugares-xofertas.service';

@Component({
  selector: 'app-tipos-de-lugares-xofertas',
  templateUrl: './tipos-de-lugares-xofertas.component.html',
  styleUrls: ['./tipos-de-lugares-xofertas.component.scss']
})

export class TiposDeLugaresXOfertasComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idTipoDeLugarXOferta = 0;
editar:boolean=false;
//lsttiposdelugaresxofertas:TiposDeLugaresXOfertas[]=[];
FGAgregarTiposDeLugaresXOfertas : FormGroup = this.formBuilder.group({      
  nombreTipoDeLugarXOferta:new FormControl('',Validators.required),
  idTipoDeLugarXOferta:new FormControl('0')
});


cargarNombresTiposDeLugaresXOfertas(tiposdelugaresxofertas:TiposDeLugaresXOfertas){
  this.FGAgregarTiposDeLugaresXOfertas.patchValue({
    nombreTipoDeLugarXOferta:tiposdelugaresxofertas.nombreTipoDeLugarXOferta,
    idTipoDeLugarXOferta:tiposdelugaresxofertas.idTipoDeLugarXOferta
  })
}  
public asignarid(idTipoDeLugarXOferta:number){
  this.idTipoDeLugarXOferta=idTipoDeLugarXOferta;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idTipoDeLugarXOferta>0)
  {
    this.tiposdelugaresxofertasService.Get(this.idTipoDeLugarXOferta.toString()).subscribe({
      next : (datatiposdelugaresxofertas:TiposDeLugaresXOfertas) => {
        this.cargarNombresTiposDeLugaresXOfertas(datatiposdelugaresxofertas);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService) { }

  crearTiposDeLugaresXOfertas(){
    let tiposdelugaresxofertas : TiposDeLugaresXOfertas = new TiposDeLugaresXOfertas;

    
    //agregamos los datos del formulario a la tabla personas
    tiposdelugaresxofertas.nombreTipoDeLugarXOferta=this.FGAgregarTiposDeLugaresXOfertas.value.nombreTipoDeLugarXOferta;
    
    
    //suscrubimos la guardada de los datos en la tabla tiposdelugaresxofertas
    this.tiposdelugaresxofertasService.create(tiposdelugaresxofertas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarTiposDeLugaresXOfertas(idTipoDeLugarXOferta:number){
    let tiposdelugaresxofertas : TiposDeLugaresXOfertas = new TiposDeLugaresXOfertas;

    tiposdelugaresxofertas.idTipoDeLugarXOferta=idTipoDeLugarXOferta;
    //agregamos los datos del formulario a la tabla tiposdelugaresxofertas
    tiposdelugaresxofertas.nombreTipoDeLugarXOferta=this.FGAgregarTiposDeLugaresXOfertas.value.nombreTipoDeLugarXOferta;
          
    //suscrubimos la guardada de los datos en la tabla tiposdelugaresxofertas
    this.tiposdelugaresxofertasService.Edit(tiposdelugaresxofertas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgTiposDeLugaresXOfertas=this.FGAgregarTiposDeLugaresXOfertas.value;
    this.tiposdelugaresxofertasService.Get(fgTiposDeLugaresXOfertas.idTipoDeLugarXOferta).subscribe({
      next : (datatiposdelugaresxofertas:TiposDeLugaresXOfertas) => {
        if(datatiposdelugaresxofertas.idTipoDeLugarXOferta<=0){
        
        this.crearTiposDeLugaresXOfertas();
        }
        else if(datatiposdelugaresxofertas.idTipoDeLugarXOferta>0){
        
        this.editarTiposDeLugaresXOfertas(datatiposdelugaresxofertas.idTipoDeLugarXOferta);
        }
        
      }
    }); 

    
  }

  
}