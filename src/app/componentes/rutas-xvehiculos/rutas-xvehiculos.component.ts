import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RutasXVehiculos, RutasXVehiculosService } from '../rutas-xvehiculos';
import { Vehiculos, VehiculosService } from '../vehiculos';
import { EstadosPorRutas, EstadosPorRutasService } from '../estados-por-rutas';
import { Empresas, EmpresasService } from '../empresas';
const myDate = new Date();

@Component({
  selector: 'app-rutas-xvehiculos',
  templateUrl: './rutas-xvehiculos.component.html',
  styleUrls: ['./rutas-xvehiculos.component.css']
})


export class RutasXVehiculosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRutaXVehiculo = 0;
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstVehiculos:Vehiculos[]=[];
  lstEmpresas:Empresas[]=[];
  lstEstadosPorRutas : EstadosPorRutas[]=[];
  lstRutasXVehiculos:RutasXVehiculos[]=[];
  //lstrutasxvehiculos:RutasXVehiculos[]=[];
  FGAgregarRutasXVehiculos : FormGroup = this.formBuilder.group({      
    idRutaXVehiculo: new FormControl('0'),
    idVehiculo:new FormControl(0,Validators.required),
    idEmpresaLogistica:new FormControl(0,Validators.required),
    idEmpresaContratante:new FormControl(0,Validators.required),
    idEstadoRuta:new FormControl(0,Validators.required),
    nombreRutaXVehiculo:new FormControl('',Validators.required),
    descripcionRutaXVehiculo:new FormControl('',Validators.required),
    fechaInicioRutaXVehiculo:new FormControl(new Date,Validators.required),
    fechaInicioRealRutaXVehiculo:new FormControl(new Date,Validators.required),
    fechaFinRutaXVehiculo:new FormControl(new Date,Validators.required),
    fechaFinRealRutaXVehiculo:new FormControl(new Date,Validators.required)
   
  });
   
  cargarNombresRutasXVehiculos(rutasxvehiculos:RutasXVehiculos){
    this.FGAgregarRutasXVehiculos.patchValue({
      idRutaXVehiculo:rutasxvehiculos.idRutaXVehiculo,
      idVehiculo:rutasxvehiculos.idVehiculo,
      idEmpresaLogistica:rutasxvehiculos.idEmpresaLogistica,
      idEmpresaContratante:rutasxvehiculos.idEmpresaContratante,
      idEstadoRuta:rutasxvehiculos.idEstadoRuta,
      nombreRutaXVehiculo:rutasxvehiculos.nombreRutaXVehiculo,
      descripcionRutaXVehiculo:rutasxvehiculos.descripcionRutaXVehiculo,
      fechaInicioRutaXVehiculo:rutasxvehiculos.fechaInicioRutaXVehiculo,
      fechaInicioRealRutaXVehiculo:rutasxvehiculos.fechaInicioRealRutaXVehiculo,
      fechaFinRutaXVehiculo:rutasxvehiculos.fechaFinRutaXVehiculo,
      fechaFinRealRutaXVehiculo:rutasxvehiculos.fechaFinRealRutaXVehiculo
    });
  }  
  

  
  public asignarid(idRutaXVehiculo:number){
    this.idRutaXVehiculo=idRutaXVehiculo;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idRutaXVehiculo>0)
    {
      this.rutasxvehiculosService.Get(this.idRutaXVehiculo.toString()).subscribe({
        next : (datarutasxvehiculos:RutasXVehiculos) => {
          this.cargarNombresRutasXVehiculos(datarutasxvehiculos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarEstadosPorRutas();
    this.listarVehiculos();
    this.listarEmpresas();
    this.listarRutasXVehiculos();
  }

  constructor(
    private estadosporrutasService: EstadosPorRutasService,
    private vehiculosService: VehiculosService,
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private rutasxvehiculosService: RutasXVehiculosService) { }

    
    listarEstadosPorRutas(){ 
      this.estadosporrutasService.GetAll().subscribe({
        next : (lstestadosporrutas:EstadosPorRutas[]) => { 
          this.lstEstadosPorRutas=lstestadosporrutas;
        }
      });
    }

  
    listarVehiculos(){ 
      this.vehiculosService.GetAll().subscribe({
        next : (lstvehiculos:Vehiculos[]) => { 
          this.lstVehiculos=lstvehiculos;
        }
      });
    }

    listarEmpresas(){
      this.empresasService.GetAll().subscribe({
        next : (lstempresas:Empresas[]) => {
          this.lstEmpresas=lstempresas;
        }
      });
    }

    listarRutasXVehiculos(){
      this.rutasxvehiculosService.GetAll().subscribe({
        next : (lstrutasxvehiculos:RutasXVehiculos[]) => {
          this.lstRutasXVehiculos=lstrutasxvehiculos;
        }
      });
    }

    

      

    crearRutasXVehiculos(){
      let rutasxvehiculos : RutasXVehiculos = new RutasXVehiculos;
      
      //agregamos los datos del formulario a la tabla vehiculos
      
      
      rutasxvehiculos.idRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.idRutaXVehiculo;
      rutasxvehiculos.idVehiculo=this.FGAgregarRutasXVehiculos.value.idVehiculo;
      rutasxvehiculos.idEmpresaLogistica=this.FGAgregarRutasXVehiculos.value.idEmpresaLogistica;
      rutasxvehiculos.idEmpresaContratante=this.FGAgregarRutasXVehiculos.value.idEmpresaContratante;
      rutasxvehiculos.idEstadoRuta=this.FGAgregarRutasXVehiculos.value.idEstadoRuta;
      rutasxvehiculos.nombreRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.nombreRutaXVehiculo;
      rutasxvehiculos.descripcionRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.descripcionRutaXVehiculo;
      rutasxvehiculos.fechaInicioRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaInicioRutaXVehiculo;
      rutasxvehiculos.fechaInicioRealRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaInicioRealRutaXVehiculo;
      rutasxvehiculos.fechaFinRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaFinRutaXVehiculo;
      rutasxvehiculos.fechaFinRealRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaFinRealRutaXVehiculo;
     //suscrubimos la guardada de los datos en la tabla rutasxvehiculos
      this.rutasxvehiculosService.create(rutasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarRutasXVehiculos(idRutaXVehiculo:number){
      let rutasxvehiculos : RutasXVehiculos = new RutasXVehiculos;
      
  //agregamos los datos del formulario a la tabla rutasxvehiculos
      rutasxvehiculos.idRutaXVehiculo=idRutaXVehiculo;
      rutasxvehiculos.idVehiculo=this.FGAgregarRutasXVehiculos.value.idVehiculo;
      rutasxvehiculos.idEmpresaLogistica=this.FGAgregarRutasXVehiculos.value.idEmpresaLogistica;
      rutasxvehiculos.idEmpresaContratante=this.FGAgregarRutasXVehiculos.value.idEmpresaContratante;
      rutasxvehiculos.idEstadoRuta=this.FGAgregarRutasXVehiculos.value.idEstadoRuta;
      rutasxvehiculos.nombreRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.nombreRutaXVehiculo;
      rutasxvehiculos.descripcionRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.descripcionRutaXVehiculo;
      rutasxvehiculos.fechaInicioRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaInicioRutaXVehiculo;
      rutasxvehiculos.fechaInicioRealRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaInicioRealRutaXVehiculo;
      rutasxvehiculos.fechaFinRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaFinRutaXVehiculo;
      rutasxvehiculos.fechaFinRealRutaXVehiculo=this.FGAgregarRutasXVehiculos.value.fechaFinRealRutaXVehiculo;
         
      //suscrubimos la guardada de los datos en la tabla rutasxvehiculos
      this.rutasxvehiculosService.Edit(rutasxvehiculos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRutasXVehiculos=this.FGAgregarRutasXVehiculos.value;
      this.rutasxvehiculosService.Get(fgRutasXVehiculos.idRutaXVehiculo).subscribe({
        next : (datarutasxvehiculos:RutasXVehiculos) => {
         if(datarutasxvehiculos.idRutaXVehiculo<=0){
          
          this.crearRutasXVehiculos();
         }
         else if(datarutasxvehiculos.idRutaXVehiculo>0){
          
          this.editarRutasXVehiculos(datarutasxvehiculos.idRutaXVehiculo);
         }
         
        }
      }); 

    }
 
}
