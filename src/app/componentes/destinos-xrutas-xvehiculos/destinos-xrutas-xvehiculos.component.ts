import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinosXRutasXVehiculos, DestinosXRutasXVehiculosService } from './';
import { RutasXVehiculos, RutasXVehiculosService } from '../rutas-xvehiculos';
import { TiposDeAccionesEnDestinoDeLaRuta, TiposDeAccionesEnDestinoDeLaRutaService } from '../tipos-de-acciones-en-destino-de-la-ruta';
import { Ciudades, CiudadesService } from '../ciudades';


@Component({
  selector: 'app-destinos-xrutas-xvehiculos',
  templateUrl: './destinos-xrutas-xvehiculos.component.html',
  styleUrls: ['./destinos-xrutas-xvehiculos.component.css']
})


export class DestinosXRutasXVehiculosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idDestinoXRutaXVehiculo = 0;
  editar:boolean=false;
  lstRutasXVehiculos:RutasXVehiculos[]=[];
  lstTiposDeAccionesEnDestinoDeLaRuta:TiposDeAccionesEnDestinoDeLaRuta[]=[];
  lstCiudades:Ciudades[]=[];
  //lstdestinosxrutasxvehiculos:DestinosXRutasXVehiculos[]=[];
  FGAgregarDestinosXRutasXVehiculos : FormGroup = this.formBuilder.group({      
    idDestinoXRutaXVehiculo:new FormControl('0'),
    idRutaXVehiculo:new FormControl('0'),
    idTipoDeAccionDestinoXRutaXVehiculo:new FormControl('0'),
    idCiudad:new FormControl('0'),
    fechaDestinoXRutaXVehiculo:new FormControl(new Date,Validators.required),
    ordenDestinoXRutaXVehiculo: new FormControl('0',Validators.required),
	  observacionDestinoXRutaXVehiculo: new FormControl('',Validators.required),
	  telefonoDestinoXRutaXVehiculo: new FormControl('',Validators.required),
	  direccionDestinoXRutaXVehiculo: new FormControl('',Validators.required),
  	duracionEnDestinoXRutaXVehiculo: new FormControl('0',Validators.required)
    
  });

  
  cargarNombresDestinosXRutasXVehiculos(destinosxrutasxvehiculos:DestinosXRutasXVehiculos){
    this.FGAgregarDestinosXRutasXVehiculos.patchValue({
      idDestinoXRutaXVehiculo:destinosxrutasxvehiculos.idDestinoXRutaXVehiculo,
      idRutaXVehiculo : destinosxrutasxvehiculos.idRutaXVehiculo,
      idTipoDeAccionDestinoXRutaXVehiculo:destinosxrutasxvehiculos.idTipoDeAccionDestinoXRutaXVehiculo,
      idCiudad:destinosxrutasxvehiculos.idCiudad,
      fechaDestinoXRutaXVehiculo:destinosxrutasxvehiculos.fechaDestinoXRutaXVehiculo,
      ordenDestinoXRutaXVehiculo:destinosxrutasxvehiculos.ordenDestinoXRutaXVehiculo,
      observacionDestinoXRutaXVehiculo:destinosxrutasxvehiculos.observacionDestinoXRutaXVehiculo,
      telefonoDestinoXRutaXVehiculo:destinosxrutasxvehiculos.telefonoDestinoXRutaXVehiculo,
      direccionDestinoXRutaXVehiculo:destinosxrutasxvehiculos.direccionDestinoXRutaXVehiculo,
      duracionEnDestinoXRutaXVehiculo:destinosxrutasxvehiculos.duracionEnDestinoXRutaXVehiculo
      
   })
  }  
  public asignarid(idDestinoXRutaXVehiculo:number){
    this.idDestinoXRutaXVehiculo=idDestinoXRutaXVehiculo;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idDestinoXRutaXVehiculo>0)
    {
      this.destinosxrutasxvehiculosService.Get(this.idDestinoXRutaXVehiculo.toString()).subscribe({
        next : (datadestinosxrutasxvehiculos:DestinosXRutasXVehiculos) => {
          this.cargarNombresDestinosXRutasXVehiculos(datadestinosxrutasxvehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarRutasXVehiculos();
    this.listarTiposDeAccionesEnDestinoDeLaRuta();
    this.listarCiudades();
           
  }

  constructor(
    private rutasxvehiculosService: RutasXVehiculosService,
    private tiposdeaccionesendestinodelarutaService: TiposDeAccionesEnDestinoDeLaRutaService,
    private ciudadesService: CiudadesService,
    private formBuilder: FormBuilder, 
    private destinosxrutasxvehiculosService: DestinosXRutasXVehiculosService) { }

    crearDestinosXRutasXVehiculos(){
      let destinosxrutasxvehiculos : DestinosXRutasXVehiculos = new DestinosXRutasXVehiculos;
  
      
      //agregamos los datos del formulario a la tabla tiposdeaccionesendestinodelaruta
      destinosxrutasxvehiculos.idDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.idDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.idRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.idRutaXVehiculo;
      destinosxrutasxvehiculos.idTipoDeAccionDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.idTipoDeAccionDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.idCiudad=this.FGAgregarDestinosXRutasXVehiculos.value.idCiudad;
      destinosxrutasxvehiculos.fechaDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.fechaDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.ordenDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.ordenDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.observacionDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.observacionDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.telefonoDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.telefonoDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.direccionDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.direccionDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.duracionEnDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.duracionEnDestinoXRutaXVehiculo;

      
     //suscrubimos la guardada de los datos en la tabla destinosxrutasxvehiculos
      this.destinosxrutasxvehiculosService.create(destinosxrutasxvehiculos).subscribe(
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

    listarTiposDeAccionesEnDestinoDeLaRuta(){
      this.tiposdeaccionesendestinodelarutaService.GetAll().subscribe({
        next : (lsttiposdeaccionesendestinodelaruta:TiposDeAccionesEnDestinoDeLaRuta[]) => {
          this.lstTiposDeAccionesEnDestinoDeLaRuta=lsttiposdeaccionesendestinodelaruta;
        }
      });
    }

    listarCiudades(){
      this.ciudadesService.GetAll().subscribe({
        next : (lstciudades:Ciudades[]) => {
          this.lstCiudades=lstciudades;
        }
      });
    }
  
    editarDestinosXRutasXVehiculos(idDestinoXRutaXVehiculo:number){
      let destinosxrutasxvehiculos : DestinosXRutasXVehiculos = new DestinosXRutasXVehiculos;
  
      destinosxrutasxvehiculos.idDestinoXRutaXVehiculo=idDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.idRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.idRutaXVehiculo;
      destinosxrutasxvehiculos.idTipoDeAccionDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.idTipoDeAccionDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.idCiudad=this.FGAgregarDestinosXRutasXVehiculos.value.idCiudad;  
      destinosxrutasxvehiculos.fechaDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.fechaDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.ordenDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.ordenDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.observacionDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.observacionDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.telefonoDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.telefonoDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.direccionDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.direccionDestinoXRutaXVehiculo;
      destinosxrutasxvehiculos.duracionEnDestinoXRutaXVehiculo=this.FGAgregarDestinosXRutasXVehiculos.value.duracionEnDestinoXRutaXVehiculo;
      
      //suscribimos la guardada de los datos en la tabla destinosxrutasxvehiculos
      this.destinosxrutasxvehiculosService.Edit(destinosxrutasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgDestinosXRutasXVehiculos=this.FGAgregarDestinosXRutasXVehiculos.value;
      this.destinosxrutasxvehiculosService.Get(fgDestinosXRutasXVehiculos.idDestinoXRutaXVehiculo).subscribe({
        next : (datadestinosxrutasxvehiculos:DestinosXRutasXVehiculos) => {
         if(datadestinosxrutasxvehiculos.idDestinoXRutaXVehiculo<=0){
          
          this.crearDestinosXRutasXVehiculos();
         }
         else if(datadestinosxrutasxvehiculos.idDestinoXRutaXVehiculo>0){
          
          this.editarDestinosXRutasXVehiculos(datadestinosxrutasxvehiculos.idDestinoXRutaXVehiculo);
         }
         
        }
      }); 
  
      
    }
  

}