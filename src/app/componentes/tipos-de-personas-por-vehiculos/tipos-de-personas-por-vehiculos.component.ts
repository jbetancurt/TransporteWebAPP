
 
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDePersonasPorVehiculos } from './tipos-de-personas-por-vehiculos.model';
import { TiposDePersonasPorVehiculosService } from './tipos-de-personas-por-vehiculos.service';

@Component({
  selector: 'app-tipos-de-personas-por-vehiculos',
  templateUrl: './tipos-de-personas-por-vehiculos.component.html',
  styleUrls: ['./tipos-de-personas-por-vehiculos.component.css']
})
export class TiposDePersonasPorVehiculosComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
@Input() idTipoDePersonaPorVehiculo = 0;
editar:boolean=false;
//lsttiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]=[];
FGAgregarTiposDePersonasPorVehiculos : FormGroup = this.formBuilder.group({      
  nombretipodepersonaporvehiculo:new FormControl('',Validators.required),
  idTipoDePersonaPorVehiculo:new FormControl('0')
});


cargarNombresTiposDePersonasPorVehiculos(tiposdepersonasporvehiculos:TiposDePersonasPorVehiculos){
  this.FGAgregarTiposDePersonasPorVehiculos.patchValue({
    nombretipodepersonaporvehiculo:tiposdepersonasporvehiculos.nombreTipoDePersonaPorVehiculo,
    idTipoDePersonaPorVehiculo:tiposdepersonasporvehiculos.idTipoDePersonaPorVehiculo
  })
}  
public asignarid(idTipoDePersonaPorVehiculo:number){
  this.idTipoDePersonaPorVehiculo=idTipoDePersonaPorVehiculo;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idTipoDePersonaPorVehiculo>0)
  {
    this.tiposdepersonasporvehiculosService.Get(this.idTipoDePersonaPorVehiculo.toString()).subscribe({
      next : (datatiposdepersonasporvehiculos:TiposDePersonasPorVehiculos) => {
        this.cargarNombresTiposDePersonasPorVehiculos(datatiposdepersonasporvehiculos);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private tiposdepersonasporvehiculosService: TiposDePersonasPorVehiculosService) { }

  crearTiposDePersonasPorVehiculos(){
    let tiposdepersonasporvehiculos : TiposDePersonasPorVehiculos = new TiposDePersonasPorVehiculos;

    
    //agregamos los datos del formulario a la tabla personas
    tiposdepersonasporvehiculos.nombreTipoDePersonaPorVehiculo=this.FGAgregarTiposDePersonasPorVehiculos.value.nombretipodepersonaporvehiculo;
    
    
    //suscrubimos la guardada de los datos en la tabla tiposdepersonasporvehiculos
    this.tiposdepersonasporvehiculosService.create(tiposdepersonasporvehiculos).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarTiposDePersonasPorVehiculos(idTipoDePersonaPorVehiculo:number){
    let tiposdepersonasporvehiculos : TiposDePersonasPorVehiculos = new TiposDePersonasPorVehiculos;

    tiposdepersonasporvehiculos.idTipoDePersonaPorVehiculo=idTipoDePersonaPorVehiculo;
    //agregamos los datos del formulario a la tabla tiposdepersonasporvehiculos
    tiposdepersonasporvehiculos.nombreTipoDePersonaPorVehiculo=this.FGAgregarTiposDePersonasPorVehiculos.value.nombretipodepersonaporvehiculo;
          
    //suscrubimos la guardada de los datos en la tabla tiposdepersonasporvehiculos
    this.tiposdepersonasporvehiculosService.Edit(tiposdepersonasporvehiculos).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgTiposDePersonasPorVehiculos=this.FGAgregarTiposDePersonasPorVehiculos.value;
    this.tiposdepersonasporvehiculosService.Get(fgTiposDePersonasPorVehiculos.idTipoDePersonaPorVehiculo).subscribe({
      next : (datatiposdepersonasporvehiculos:TiposDePersonasPorVehiculos) => {
        if(datatiposdepersonasporvehiculos.idTipoDePersonaPorVehiculo<=0){
        
        this.crearTiposDePersonasPorVehiculos();
        }
        else if(datatiposdepersonasporvehiculos.idTipoDePersonaPorVehiculo>0){
        
        this.editarTiposDePersonasPorVehiculos(datatiposdepersonasporvehiculos.idTipoDePersonaPorVehiculo);
        }
        
      }
    }); 

    
  }

  
}