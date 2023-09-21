import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DesplazamientosXRutasXVehiculos, DesplazamientosXRutasXVehiculosService } from './';
import { RutasXVehiculos, RutasXVehiculosService } from '../rutas-xvehiculos';
const myDate = new Date();

   
@Component({
  selector: 'app-desplazamientos-xrutas-xvehiculos',
  templateUrl: './desplazamientos-xrutas-xvehiculos.component.html',
  styleUrls: ['./desplazamientos-xrutas-xvehiculos.component.scss']
})

export class DesplazamientosXRutasXVehiculosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  myTimeString = myDate.toTimeString().slice(0, 5);
  @Input() idDesplazamientoXRutaXVehiculo = 0;
  editar:boolean=false;
  lstRutasXVehiculos:RutasXVehiculos[]=[];
  //lstdesplazamientosxrutasxvehiculos:DesplazamientosXRutasXVehiculos[]=[];
  FGAgregarDesplazamientosXRutasXVehiculos : FormGroup = this.formBuilder.group({      
    idDesplazamientoXRutaXVehiculo:new FormControl('0'),
    idRutaXVehiculo:new FormControl('1'),
    fechadesplazamientoxrutaxvehiculo:new FormControl(new Date,Validators.required),
    horadesplazamientoxrutaxvehiculo:new FormControl(this.myTimeString,Validators.required)
  });

  
  cargarNombresDesplazamientosXRutasXVehiculos(desplazamientosxrutasxvehiculos:DesplazamientosXRutasXVehiculos){
    this.FGAgregarDesplazamientosXRutasXVehiculos.patchValue({
      idDesplazamientoXRutaXVehiculo:desplazamientosxrutasxvehiculos.idDesplazamientoXRutaXVehiculo,
      idRutaXVehiculo : desplazamientosxrutasxvehiculos.idRutaXVehiculo,
      fechadesplazamientoxrutaxvehiculo:desplazamientosxrutasxvehiculos.fechaDesplazamientoXRutaXVehiculo,
      horadesplazamientoxrutaxvehiculo:desplazamientosxrutasxvehiculos.horaDesplazamientoXRutaXVehiculo
    })
  }  
  public asignarid(idDesplazamientoXRutaXVehiculo:number){
    this.idDesplazamientoXRutaXVehiculo=idDesplazamientoXRutaXVehiculo;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idDesplazamientoXRutaXVehiculo>0)
    {
      this.desplazamientosxrutasxvehiculosService.Get(this.idDesplazamientoXRutaXVehiculo.toString()).subscribe({
        next : (datadesplazamientosxrutasxvehiculos:DesplazamientosXRutasXVehiculos) => {
          this.cargarNombresDesplazamientosXRutasXVehiculos(datadesplazamientosxrutasxvehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarRutasXVehiculos();
           
  }

  constructor(
    private rutasxvehiculosService: RutasXVehiculosService,
    private formBuilder: FormBuilder, 
    private desplazamientosxrutasxvehiculosService: DesplazamientosXRutasXVehiculosService) { }

    crearDesplazamientosXRutasXVehiculos(){
      let desplazamientosxrutasxvehiculos : DesplazamientosXRutasXVehiculos = new DesplazamientosXRutasXVehiculos;
  
      
      //agregamos los datos del formulario a la tabla personas
      desplazamientosxrutasxvehiculos.fechaDesplazamientoXRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.fechadesplazamientoxrutaxvehiculo;
      desplazamientosxrutasxvehiculos.idDesplazamientoXRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.idDesplazamientoXRutaXVehiculo;
      desplazamientosxrutasxvehiculos.idRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.idRutaXVehiculo;
      desplazamientosxrutasxvehiculos.horaDesplazamientoXRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.horadesplazamientoxrutaxvehiculo;
      
     //suscrubimos la guardada de los datos en la tabla desplazamientosxrutasxvehiculos
      this.desplazamientosxrutasxvehiculosService.create(desplazamientosxrutasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarRutasXVehiculos(){ 
      this.rutasxvehiculosService.GetAll().subscribe({
        next : (lstrutasxvehiculos:RutasXVehiculos[]) => { 
          this.lstRutasXVehiculos=lstrutasxvehiculos;
        }
      });
    }
  
    editarDesplazamientosXRutasXVehiculos(idDesplazamientoXRutaXVehiculo:number){
      let desplazamientosxrutasxvehiculos : DesplazamientosXRutasXVehiculos = new DesplazamientosXRutasXVehiculos;
  
      desplazamientosxrutasxvehiculos.idDesplazamientoXRutaXVehiculo=idDesplazamientoXRutaXVehiculo;
      //agregamos los datos del formulario a la tabla desplazamientosxrutasxvehiculos
      desplazamientosxrutasxvehiculos.fechaDesplazamientoXRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.fechadesplazamientoxrutaxvehiculo;
      desplazamientosxrutasxvehiculos.idRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.idRutaXVehiculo;
      desplazamientosxrutasxvehiculos.horaDesplazamientoXRutaXVehiculo=this.FGAgregarDesplazamientosXRutasXVehiculos.value.horadesplazamientoxrutaxvehiculo;
            
           
    
      //suscrubimos la guardada de los datos en la tabla desplazamientosxrutasxvehiculos
      this.desplazamientosxrutasxvehiculosService.Edit(desplazamientosxrutasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgDesplazamientosXRutasXVehiculos=this.FGAgregarDesplazamientosXRutasXVehiculos.value;
      this.desplazamientosxrutasxvehiculosService.Get(fgDesplazamientosXRutasXVehiculos.idDesplazamientoXRutaXVehiculo).subscribe({
        next : (datadesplazamientosxrutasxvehiculos:DesplazamientosXRutasXVehiculos) => {
         if(datadesplazamientosxrutasxvehiculos.idDesplazamientoXRutaXVehiculo<=0){
          
          this.crearDesplazamientosXRutasXVehiculos();
         }
         else if(datadesplazamientosxrutasxvehiculos.idDesplazamientoXRutaXVehiculo>0){
          
          this.editarDesplazamientosXRutasXVehiculos(datadesplazamientosxrutasxvehiculos.idDesplazamientoXRutaXVehiculo);
         }
         
        }
      }); 
  
      
    }
  

}