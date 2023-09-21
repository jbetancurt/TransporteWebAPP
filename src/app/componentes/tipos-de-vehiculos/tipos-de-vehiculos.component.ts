import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeVehiculos } from './tipos-de-vehiculos.model';
import { TiposDeVehiculosService } from './tipos-de-vehiculos.service';

@Component({
  selector: 'app-tipos-de-vehiculos',
  templateUrl: './tipos-de-vehiculos.component.html',
  styleUrls: ['./tipos-de-vehiculos.component.scss']
})
export class TiposDeVehiculosComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDeVehiculo = 0;
  editar:boolean=false;
  //lsttiposdevehiculos:TiposDeVehiculos[]=[];
  FGAgregarTiposDeVehiculos : FormGroup = this.formBuilder.group({      
    nombretipodevehiculo:new FormControl('',Validators.required),
    idTipoDeVehiculo:new FormControl('0')
  });

  
  cargarNombresTiposDeVehiculos(tiposdevehiculos:TiposDeVehiculos){
    this.FGAgregarTiposDeVehiculos.patchValue({
      nombretipodevehiculo:tiposdevehiculos.nombreTipoDeVehiculo,
      idTipoDeVehiculo:tiposdevehiculos.idTipoDeVehiculo
    })
  }  
  public asignarid(idTipoDeVehiculo:number){
    this.idTipoDeVehiculo=idTipoDeVehiculo;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoDeVehiculo>0)
    {
      this.tiposdevehiculosService.Get(this.idTipoDeVehiculo.toString()).subscribe({
        next : (datatiposdevehiculos:TiposDeVehiculos) => {
          this.cargarNombresTiposDeVehiculos(datatiposdevehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposdevehiculosService: TiposDeVehiculosService) { }

    crearTiposDeVehiculos(){
      let tiposdevehiculos : TiposDeVehiculos = new TiposDeVehiculos;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposdevehiculos.nombreTipoDeVehiculo=this.FGAgregarTiposDeVehiculos.value.nombretipodevehiculo;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposdevehiculos
      this.tiposdevehiculosService.create(tiposdevehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDeVehiculos(idTipoDeVehiculo:number){
      let tiposdevehiculos : TiposDeVehiculos = new TiposDeVehiculos;
  
      tiposdevehiculos.idTipoDeVehiculo=idTipoDeVehiculo;
      //agregamos los datos del formulario a la tabla tiposdevehiculos
      tiposdevehiculos.nombreTipoDeVehiculo=this.FGAgregarTiposDeVehiculos.value.nombretipodevehiculo;
            
     //suscrubimos la guardada de los datos en la tabla tiposdevehiculos
      this.tiposdevehiculosService.Edit(tiposdevehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposDeVehiculos=this.FGAgregarTiposDeVehiculos.value;
      this.tiposdevehiculosService.Get(fgTiposDeVehiculos.idTipoDeVehiculo).subscribe({
        next : (datatiposdevehiculos:TiposDeVehiculos) => {
         if(datatiposdevehiculos.idTipoDeVehiculo<=0){
          
          this.crearTiposDeVehiculos();
         }
         else if(datatiposdevehiculos.idTipoDeVehiculo>0){
          
          this.editarTiposDeVehiculos(datatiposdevehiculos.idTipoDeVehiculo);
         }
         
        }
      }); 
  
      
    }
  

}



