import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehiculos, VehiculosService } from './';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../carrocerias-xtipos-de-vehiculos';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../tipos-de-vehiculos';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})


export class VehiculosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idVehiculo = 0;
  editar:boolean=false;
  lstCarroceriasXTiposDeVehiculos:CarroceriasXTiposDeVehiculos[]=[];
  lstTiposDeCarrocerias:TiposDeCarrocerias[]=[];
  lstTiposDeVehiculos:TiposDeVehiculos[]=[];
  //lstvehiculos:Vehiculos[]=[];
  FGAgregarVehiculos : FormGroup = this.formBuilder.group({      
    idVehiculo:new FormControl('0'),
    idCarroceriaXTipoDeVehiculo:new FormControl('0'),
    idTipoDeCarroceria:new FormControl('0'),
    idTipoDeVehiculo:new FormControl('0'),
    placaVehiculo:new FormControl('',Validators.required),
    placaTrailerVehiculo:new FormControl('',Validators.required)
    
  });

  
  cargarNombresVehiculos(vehiculos:Vehiculos){
    this.FGAgregarVehiculos.patchValue({
      idVehiculo:vehiculos.idVehiculo,
      idCarroceriaXTipoDeVehiculo : vehiculos.idCarroceriaXTipoDeVehiculo,
      idTipoDeCarroceria:vehiculos.idTipoDeCarroceria,
      idTipoDeVehiculo:vehiculos.idTipoDeVehiculo,
      placaVehiculo:vehiculos.placaVehiculo,
      placaTrailerVehiculo:vehiculos.placaTrailerVehiculo
      
   })
  }  
  public asignarid(idVehiculo:number){
    this.idVehiculo=idVehiculo;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idVehiculo>0)
    {
      this.vehiculosService.Get(this.idVehiculo.toString()).subscribe({
        next : (datavehiculos:Vehiculos) => {
          this.cargarNombresVehiculos(datavehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarCarroceriasXTiposDeVehiculos();
    this.listarTiposDeCarrocerias();
    this.listarTiposDeVehiculos();
           
  }

  constructor(
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
    private tiposdecarroceriasService: TiposDeCarroceriasService,
    private tiposdevehiculosService: TiposDeVehiculosService,
    private formBuilder: FormBuilder, 
    private vehiculosService: VehiculosService) { }

    crearVehiculos(){
      let vehiculos : Vehiculos = new Vehiculos;
  
      
      //agregamos los datos del formulario a la tabla tiposdecarrocerias
      vehiculos.idVehiculo=this.FGAgregarVehiculos.value.idVehiculo;
      vehiculos.idCarroceriaXTipoDeVehiculo=this.FGAgregarVehiculos.value.idCarroceriaXTipoDeVehiculo;
      vehiculos.idTipoDeCarroceria=this.FGAgregarVehiculos.value.idTipoDeCarroceria;
      vehiculos.idTipoDeVehiculo=this.FGAgregarVehiculos.value.idTipoDeVehiculo;
      vehiculos.placaVehiculo=this.FGAgregarVehiculos.value.placaVehiculo;
      vehiculos.placaTrailerVehiculo=this.FGAgregarVehiculos.value.placaTrailerVehiculo;
      
      
     //suscrubimos la guardada de los datos en la tabla vehiculos
      this.vehiculosService.create(vehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarCarroceriasXTiposDeVehiculos(){ 
      this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
        next : (lstcarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]) => { 
          this.lstCarroceriasXTiposDeVehiculos=lstcarroceriasxtiposdevehiculos;
        }
      });
    }

    listarTiposDeCarrocerias(){
      this.tiposdecarroceriasService.GetAll().subscribe({
        next : (lsttiposdecarrocerias:TiposDeCarrocerias[]) => {
          this.lstTiposDeCarrocerias=lsttiposdecarrocerias;
        }
      });
    }

    listarTiposDeVehiculos(){
      this.tiposdevehiculosService.GetAll().subscribe({
        next : (lsttiposdevehiculos:TiposDeVehiculos[]) => {
          this.lstTiposDeVehiculos=lsttiposdevehiculos;
        }
      });
    }
  
    editarVehiculos(idVehiculo:number){
      let vehiculos : Vehiculos = new Vehiculos;
  
      vehiculos.idVehiculo=idVehiculo;
      vehiculos.idCarroceriaXTipoDeVehiculo=this.FGAgregarVehiculos.value.idCarroceriaXTipoDeVehiculo;
      vehiculos.idTipoDeCarroceria=this.FGAgregarVehiculos.value.idTipoDeCarroceria;
      vehiculos.idTipoDeVehiculo=this.FGAgregarVehiculos.value.idTipoDeVehiculo;  
      vehiculos.placaVehiculo=this.FGAgregarVehiculos.value.placaVehiculo;
      vehiculos.placaTrailerVehiculo=this.FGAgregarVehiculos.value.placaTrailerVehiculo;
      
      
      //suscribimos la guardada de los datos en la tabla vehiculos
      this.vehiculosService.Edit(vehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgVehiculos=this.FGAgregarVehiculos.value;
      this.vehiculosService.Get(fgVehiculos.idVehiculo).subscribe({
        next : (datavehiculos:Vehiculos) => {
         if(datavehiculos.idVehiculo<=0){
          
          this.crearVehiculos();
         }
         else if(datavehiculos.idVehiculo>0){
          
          this.editarVehiculos(datavehiculos.idVehiculo);
         }
         
        }
      }); 
  
      
    }
  

}