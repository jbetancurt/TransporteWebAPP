
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../carrocerias-xtipos-de-vehiculos';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../tipos-de-vehiculos';

@Component({
  selector: 'app-carrocerias-xtipos-de-vehiculos',
  templateUrl: './carrocerias-xtipos-de-vehiculos.component.html',
  styleUrls: ['./carrocerias-xtipos-de-vehiculos.component.scss']
})

export class CarroceriasXTiposDeVehiculosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idCarroceriaXTipoDeVehiculo = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstTiposDeCarrocerias:TiposDeCarrocerias[]=[];
  lstTiposDeVehiculos : TiposDeVehiculos[]=[];
  //lstcarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]=[];
  FGAgregarCarroceriasXTiposDeVehiculos : FormGroup = this.formBuilder.group({      
    idCarroceriaXTipoDeVehiculo: new FormControl('0'),
    tieneTrailer: false,
    idTipoDeCarroceria:new FormControl(0,Validators.required),
    idTipoDeVehiculo:new FormControl(1,Validators.required),
  });
    
  cargarNombresCarroceriasXTiposDeVehiculos(carroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos){
    this.tiposdecarroceriasService.Get(carroceriasxtiposdevehiculos.idTipoDeCarroceria.toString()).subscribe({ 
      next : (datatiposdecarrocerias:TiposDeCarrocerias) => {
        if (datatiposdecarrocerias.idTipoDeCarroceria>0){
          this.FGAgregarCarroceriasXTiposDeVehiculos.patchValue({
            tieneTrailer:carroceriasxtiposdevehiculos.tieneTrailer ?? false,
            idCarroceriaXTipoDeVehiculo:carroceriasxtiposdevehiculos.idCarroceriaXTipoDeVehiculo,
            idTipoDeVehiculo:carroceriasxtiposdevehiculos.idTipoDeVehiculo,
            idTipoDeCarroceria:carroceriasxtiposdevehiculos.idTipoDeCarroceria
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idCarroceriaXTipoDeVehiculo:number){
    this.idCarroceriaXTipoDeVehiculo=idCarroceriaXTipoDeVehiculo;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idCarroceriaXTipoDeVehiculo>0)
    {
      this.carroceriasxtiposdevehiculosService.Get(this.idCarroceriaXTipoDeVehiculo.toString()).subscribe({
        next : (datacarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos) => {
          this.cargarNombresCarroceriasXTiposDeVehiculos(datacarroceriasxtiposdevehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposDeVehiculos();
    this.listarTiposDeCarrocerias();
  }

  constructor(
    private tiposdevehiculosService: TiposDeVehiculosService,
    private tiposdecarroceriasService: TiposDeCarroceriasService,
    private formBuilder: FormBuilder, 
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService) { }

    
    listarTiposDeVehiculos(){ 
      this.tiposdevehiculosService.GetAll().subscribe({
        next : (lsttiposdevehiculos:TiposDeVehiculos[]) => { 
          this.lstTiposDeVehiculos=lsttiposdevehiculos;
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

    crearCarroceriasXTiposDeVehiculos(){
      let carroceriasxtiposdevehiculos : CarroceriasXTiposDeVehiculos = new CarroceriasXTiposDeVehiculos;
  
      
      //agregamos los datos del formulario a la tabla personas
      carroceriasxtiposdevehiculos.tieneTrailer=this.FGAgregarCarroceriasXTiposDeVehiculos.value.tieneTrailer;
      carroceriasxtiposdevehiculos.idCarroceriaXTipoDeVehiculo=this.FGAgregarCarroceriasXTiposDeVehiculos.value.idCarroceriaXTipoDeVehiculo;
      carroceriasxtiposdevehiculos.idTipoDeVehiculo=this.FGAgregarCarroceriasXTiposDeVehiculos.value.idTipoDeVehiculo;
      carroceriasxtiposdevehiculos.idTipoDeCarroceria=this.FGAgregarCarroceriasXTiposDeVehiculos.value.idTipoDeCarroceria;
      
     //suscrubimos la guardada de los datos en la tabla carroceriasxtiposdevehiculos
      this.carroceriasxtiposdevehiculosService.create(carroceriasxtiposdevehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarCarroceriasXTiposDeVehiculos(idCarroceriaXTipoDeVehiculo:number){
      let carroceriasxtiposdevehiculos : CarroceriasXTiposDeVehiculos = new CarroceriasXTiposDeVehiculos;
  
      carroceriasxtiposdevehiculos.idCarroceriaXTipoDeVehiculo=idCarroceriaXTipoDeVehiculo;
      carroceriasxtiposdevehiculos.idTipoDeVehiculo=this.FGAgregarCarroceriasXTiposDeVehiculos.value.idTipoDeVehiculo;
      //agregamos los datos del formulario a la tabla carroceriasxtiposdevehiculos
      carroceriasxtiposdevehiculos.tieneTrailer=this.FGAgregarCarroceriasXTiposDeVehiculos.value.tieneTrailer;
      carroceriasxtiposdevehiculos.idTipoDeCarroceria=this.FGAgregarCarroceriasXTiposDeVehiculos.value.idTipoDeCarroceria;
               
           
    
      //suscrubimos la guardada de los datos en la tabla carroceriasxtiposdevehiculos
      this.carroceriasxtiposdevehiculosService.Edit(carroceriasxtiposdevehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgCarroceriasXTiposDeVehiculos=this.FGAgregarCarroceriasXTiposDeVehiculos.value;
      this.carroceriasxtiposdevehiculosService.Get(fgCarroceriasXTiposDeVehiculos.idCarroceriaXTipoDeVehiculo).subscribe({
        next : (datacarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos) => {
         if(datacarroceriasxtiposdevehiculos.idCarroceriaXTipoDeVehiculo<=0){
          
          this.crearCarroceriasXTiposDeVehiculos();
         }
         else if(datacarroceriasxtiposdevehiculos.idCarroceriaXTipoDeVehiculo>0){
          
          this.editarCarroceriasXTiposDeVehiculos(datacarroceriasxtiposdevehiculos.idCarroceriaXTipoDeVehiculo);
         }
         
        }
      }); 
  
      
    }
  

}

