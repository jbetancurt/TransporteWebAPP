import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertas, PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from './';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../carrocerias-xtipos-de-vehiculos';


@Component({
  selector: 'app-plantillas-carrocerias-xtipos-de-vehiculos-xofertas',
  templateUrl: './plantillas-carrocerias-xtipos-de-vehiculos-xofertas.component.html',
  styleUrls: ['./plantillas-carrocerias-xtipos-de-vehiculos-xofertas.component.scss']
})


export class PlantillasCarroceriasXTiposDeVehiculosXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idCarroceriaXTipoDeVehiculoXOferta = 0;
  editar:boolean=false;
  lstPlantillasOfertas:Plantillas_Ofertas[]=[];
  lstCarroceriasXTiposDeVehiculos:CarroceriasXTiposDeVehiculos[]=[];
  //lstplantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
  FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas : FormGroup = this.formBuilder.group({      
    idCarroceriaXTipoDeVehiculoXOferta:new FormControl('0'),
    idOferta:new FormControl('1'),
    idCarroceriaXTipoDeVehiculo:new FormControl('1'),
    nombrePlantillaCarroceriaXTipoDeVehiculoXOferta:new FormControl('',Validators.required),
  });

 
  cargarNombresPlantillasCarroceriasXTiposDeVehiculosXOfertas(plantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas){
    this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.patchValue({
      idCarroceriaXTipoDeVehiculoXOferta:plantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculoXOferta,
      idOferta : plantillascarroceriasxtiposdevehiculosxofertas.idOferta,
      idCarroceriaXTipoDeVehiculo:plantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculo,
      nombrePlantillaCarroceriaXTipoDeVehiculoXOferta:plantillascarroceriasxtiposdevehiculosxofertas.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta,
    })
  }  
  public asignarid(idCarroceriaXTipoDeVehiculoXOferta:number){
    this.idCarroceriaXTipoDeVehiculoXOferta=idCarroceriaXTipoDeVehiculoXOferta;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idCarroceriaXTipoDeVehiculoXOferta>0)
    {
      this.plantillascarroceriasxtiposdevehiculosxofertasService.Get(this.idCarroceriaXTipoDeVehiculoXOferta.toString()).subscribe({
        next : (dataplantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas) => {
          this.cargarNombresPlantillasCarroceriasXTiposDeVehiculosXOfertas(dataplantillascarroceriasxtiposdevehiculosxofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarPlantillasOfertas();
    this.listarCarroceriasXTiposDeVehiculos();
    this.listarPlantillasCarroceriasXTiposDeVehiculosXOfertas();
    
           
  }

  constructor(
    private plantillasofertasService: Plantillas_OfertasService,
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
    private formBuilder: FormBuilder, 
    private plantillascarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService) { }

    crearPlantillasCarroceriasXTiposDeVehiculosXOfertas(){
      let plantillascarroceriasxtiposdevehiculosxofertas : PlantillasCarroceriasXTiposDeVehiculosXOfertas = new PlantillasCarroceriasXTiposDeVehiculosXOfertas;
  
      
      //agregamos los datos del formulario a la tabla personas
      plantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculoXOferta=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.idCarroceriaXTipoDeVehiculoXOferta;
      plantillascarroceriasxtiposdevehiculosxofertas.idOferta=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.idOferta;
      plantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculo=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.idCarroceriaXTipoDeVehiculo;
      plantillascarroceriasxtiposdevehiculosxofertas.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta;
      
      
      
     //suscrubimos la guardada de los datos en la tabla plantillascarroceriasxtiposdevehiculosxofertas
      this.plantillascarroceriasxtiposdevehiculosxofertasService.create(plantillascarroceriasxtiposdevehiculosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarPlantillasOfertas(){ 
      this.plantillasofertasService.GetAll().subscribe({
        next : (lstplantillasofertas:Plantillas_Ofertas[]) => { 
          this.lstPlantillasOfertas=lstplantillasofertas;
        }
      });
    }

    listarPlantillasCarroceriasXTiposDeVehiculosXOfertas(){
      this.plantillascarroceriasxtiposdevehiculosxofertasService.GetAll().subscribe({
        next : (lstplantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]) => {
          //this.lstplantillascarroceriasxtiposdevehiculosxofertas = lstplantillascarroceriasxtiposdevehiculosxofertas;
        }
      });
    }

    listarCarroceriasXTiposDeVehiculos(){ 
      this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
        next : (lstcarroceriasxtiposdevehiculos:CarroceriasXTiposDeVehiculos[]) => { 
          this.lstCarroceriasXTiposDeVehiculos=lstcarroceriasxtiposdevehiculos;
        }
      });
    }
  
    editarPlantillasCarroceriasXTiposDeVehiculosXOfertas(idCarroceriaXTipoDeVehiculoXOferta:number){
      let plantillascarroceriasxtiposdevehiculosxofertas : PlantillasCarroceriasXTiposDeVehiculosXOfertas = new PlantillasCarroceriasXTiposDeVehiculosXOfertas;
  
      plantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculoXOferta=idCarroceriaXTipoDeVehiculoXOferta;
      plantillascarroceriasxtiposdevehiculosxofertas.idOferta=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.idOferta;
      plantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculo=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.idCarroceriaXTipoDeVehiculo;
      //agregamos los datos del formulario a la tabla plantillascarroceriasxtiposdevehiculosxofertas
      plantillascarroceriasxtiposdevehiculosxofertas.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta;
      
      //suscrubimos la guardada de los datos en la tabla plantillascarroceriasxtiposdevehiculosxofertas
      this.plantillascarroceriasxtiposdevehiculosxofertasService.Edit(plantillascarroceriasxtiposdevehiculosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPlantillasCarroceriasXTiposDeVehiculosXOfertas=this.FGAgregarPlantillasCarroceriasXTiposDeVehiculosXOfertas.value;
      this.plantillascarroceriasxtiposdevehiculosxofertasService.Get(fgPlantillasCarroceriasXTiposDeVehiculosXOfertas.idCarroceriaXTipoDeVehiculoXOferta).subscribe({
        next : (dataplantillascarroceriasxtiposdevehiculosxofertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas) => {
         if(dataplantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculoXOferta<=0){
          
          this.crearPlantillasCarroceriasXTiposDeVehiculosXOfertas();
         }
         else if(dataplantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculoXOferta>0){
          
          this.editarPlantillasCarroceriasXTiposDeVehiculosXOfertas(dataplantillascarroceriasxtiposdevehiculosxofertas.idCarroceriaXTipoDeVehiculoXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
