import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasXVehiculos, PersonasXVehiculosService } from './';
import { Vehiculos, VehiculosService } from '../vehiculos';
import { Personas, PersonasService } from '../personas';
import { TiposDePersonasPorVehiculos, TiposDePersonasPorVehiculosService } from '../tipos-de-personas-por-vehiculos';

@Component({
  selector: 'app-personas-xvehiculos',
  templateUrl: './personas-xvehiculos.component.html',
  styleUrls: ['./personas-xvehiculos.component.scss']
})



export class PersonasXVehiculosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idPersonaXVehiculo = 0;
  editar:boolean=false;
  lstVehiculos:Vehiculos[]=[];
  lstPersonas:Personas[]=[];
  lstTiposDePersonasPorVehiculos:TiposDePersonasPorVehiculos[]=[];
  //lstpersonasxvehiculos:PersonasXVehiculos[]=[];
  FGAgregarPersonasXVehiculos : FormGroup = this.formBuilder.group({      
    idPersonaXVehiculo:new FormControl('0'),
    idVehiculo:new FormControl('0'),
    idPersona:new FormControl('0'),
    idTipoDePersonaPorVehiculo:new FormControl('0')
        
  });

  
  cargarNombresPersonasXVehiculos(personasxvehiculos:PersonasXVehiculos){
    this.FGAgregarPersonasXVehiculos.patchValue({
      idPersonaXVehiculo:personasxvehiculos.idPersonaXVehiculo,
      idVehiculo : personasxvehiculos.idVehiculo,
      idPersona:personasxvehiculos.idPersona,
      idTipoDePersonaPorVehiculo:personasxvehiculos.idTipoDePersonaPorVehiculo
      
      
   })
  }  
  public asignarid(idPersonaXVehiculo:number){
    this.idPersonaXVehiculo=idPersonaXVehiculo;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idPersonaXVehiculo>0)
    {
      this.personasxvehiculosService.Get(this.idPersonaXVehiculo.toString()).subscribe({
        next : (datapersonasxvehiculos:PersonasXVehiculos) => {
          this.cargarNombresPersonasXVehiculos(datapersonasxvehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarVehiculos();
    this.listarPersonas();
    this.listarTiposDePersonasPorVehiculos();
           
  }

  constructor(
    private vehiculosService: VehiculosService,
    private personasService: PersonasService,
    private tiposdepersonasporvehiculosService: TiposDePersonasPorVehiculosService,
    private formBuilder: FormBuilder, 
    private personasxvehiculosService: PersonasXVehiculosService) { }

    crearPersonasXVehiculos(){
      let personasxvehiculos : PersonasXVehiculos = new PersonasXVehiculos;
  
      
      //agregamos los datos del formulario a la tabla personas
      personasxvehiculos.idPersonaXVehiculo=this.FGAgregarPersonasXVehiculos.value.idPersonaXVehiculo;
      personasxvehiculos.idVehiculo=this.FGAgregarPersonasXVehiculos.value.idVehiculo;
      personasxvehiculos.idPersona=this.FGAgregarPersonasXVehiculos.value.idPersona;
      personasxvehiculos.idTipoDePersonaPorVehiculo=this.FGAgregarPersonasXVehiculos.value.idTipoDePersonaPorVehiculo;
     
      
     //suscrubimos la guardada de los datos en la tabla personasxvehiculos
      this.personasxvehiculosService.create(personasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarVehiculos(){ 
      this.vehiculosService.GetAll().subscribe({
        next : (lstvehiculos:Vehiculos[]) => { 
          this.lstVehiculos=lstvehiculos;
        }
      });
    }

    listarPersonas(){
      this.personasService.GetAll().subscribe({
        next : (lstpersonas:Personas[]) => {
          this.lstPersonas=lstpersonas;
        }
      });
    }

    listarTiposDePersonasPorVehiculos(){
      this.tiposdepersonasporvehiculosService.GetAll().subscribe({
        next : (lsttiposdepersonasporvehiculos:TiposDePersonasPorVehiculos[]) => {
          this.lstTiposDePersonasPorVehiculos=lsttiposdepersonasporvehiculos;
        }
      });
    }
  
    editarPersonasXVehiculos(idPersonaXVehiculo:number){
      let personasxvehiculos : PersonasXVehiculos = new PersonasXVehiculos;
  
      personasxvehiculos.idPersonaXVehiculo=idPersonaXVehiculo;
      personasxvehiculos.idVehiculo=this.FGAgregarPersonasXVehiculos.value.idVehiculo;
      personasxvehiculos.idPersona=this.FGAgregarPersonasXVehiculos.value.idPersona;
      personasxvehiculos.idTipoDePersonaPorVehiculo=this.FGAgregarPersonasXVehiculos.value.idTipoDePersonaPorVehiculo;  
      
      
      //suscribimos la guardada de los datos en la tabla personasxvehiculos
      this.personasxvehiculosService.Edit(personasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPersonasXVehiculos=this.FGAgregarPersonasXVehiculos.value;
      this.personasxvehiculosService.Get(fgPersonasXVehiculos.idPersonaXVehiculo).subscribe({
        next : (datapersonasxvehiculos:PersonasXVehiculos) => {
         if(datapersonasxvehiculos.idPersonaXVehiculo<=0){
          
          this.crearPersonasXVehiculos();
         }
         else if(datapersonasxvehiculos.idPersonaXVehiculo>0){
          
          this.editarPersonasXVehiculos(datapersonasxvehiculos.idPersonaXVehiculo);
         }
         
        }
      }); 
  
      
    }
  

}