import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculosXEmpresas, VehiculosXEmpresasService } from '../vehiculos-xempresas';
import { Empresas, EmpresasService } from '../empresas';
import { Vehiculos, VehiculosService } from '../vehiculos';

@Component({
  selector: 'app-vehiculos-xempresas',
  templateUrl: './vehiculos-xempresas.component.html',
  styleUrls: ['./vehiculos-xempresas.component.scss']
})

export class VehiculosXEmpresasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idVehiculoXEmpresa = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstEmpresas:Empresas[]=[];
  lstVehiculos : Vehiculos[]=[];
  //lstvehiculosxempresas:VehiculosXEmpresas[]=[];
  FGAgregarVehiculosXEmpresas : FormGroup = this.formBuilder.group({      
    idVehiculoXEmpresa: new FormControl('0'),
    idVehiculo:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required)
    
  });
    
  cargarNombresVehiculosXEmpresas(vehiculosxempresas:VehiculosXEmpresas){
    this.vehiculosxempresasService.Get(vehiculosxempresas.idVehiculoXEmpresa.toString()).subscribe({ 
      next : (datavehiculosxempresas:VehiculosXEmpresas) => {
        if (datavehiculosxempresas.idVehiculoXEmpresa>0){
          this.FGAgregarVehiculosXEmpresas.patchValue({
            idVehiculoXEmpresa:vehiculosxempresas.idVehiculoXEmpresa,
            idVehiculo:vehiculosxempresas.idVehiculo,
            idEmpresa:datavehiculosxempresas.idEmpresa
           
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idVehiculoXEmpresa:number){
    this.idVehiculoXEmpresa=idVehiculoXEmpresa;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idVehiculoXEmpresa>0)
    {
      this.vehiculosxempresasService.Get(this.idVehiculoXEmpresa.toString()).subscribe({
        next : (datavehiculosxempresas:VehiculosXEmpresas) => {
          this.cargarNombresVehiculosXEmpresas(datavehiculosxempresas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarVehiculos();
    this.listarEmpresas();
  }

  constructor(
    private vehiculosService: VehiculosService,
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private vehiculosxempresasService: VehiculosXEmpresasService) { }

    
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

    crearVehiculosXEmpresas(){
      let vehiculosxempresas : VehiculosXEmpresas = new VehiculosXEmpresas;
  
      
      //agregamos los datos del formulario a la tabla empresas
      vehiculosxempresas.idVehiculoXEmpresa=this.FGAgregarVehiculosXEmpresas.value.idVehiculoXEmpresa;
      vehiculosxempresas.idVehiculo=this.FGAgregarVehiculosXEmpresas.value.idVehiculo;
      vehiculosxempresas.idEmpresa=this.FGAgregarVehiculosXEmpresas.value.idEmpresa;
           
     //suscrubimos la guardada de los datos en la tabla vehiculosxempresas
      this.vehiculosxempresasService.create(vehiculosxempresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarVehiculosXEmpresas(idVehiculoXEmpresa:number){
      let vehiculosxempresas : VehiculosXEmpresas = new VehiculosXEmpresas;
  //agregamos los datos del formulario a la tabla vehiculosxempresas
      vehiculosxempresas.idVehiculoXEmpresa=idVehiculoXEmpresa;
      vehiculosxempresas.idVehiculo=this.FGAgregarVehiculosXEmpresas.value.idVehiculo;
      vehiculosxempresas.idEmpresa=this.FGAgregarVehiculosXEmpresas.value.idEmpresa;
      //suscrubimos la guardada de los datos en la tabla vehiculosxempresas
      this.vehiculosxempresasService.Edit(vehiculosxempresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgVehiculosXEmpresas=this.FGAgregarVehiculosXEmpresas.value;
      this.vehiculosxempresasService.Get(fgVehiculosXEmpresas.idVehiculoXEmpresa).subscribe({
        next : (datavehiculosxempresas:VehiculosXEmpresas) => {
         if(datavehiculosxempresas.idVehiculoXEmpresa<=0){
          
          this.crearVehiculosXEmpresas();
         }
         else if(datavehiculosxempresas.idVehiculoXEmpresa>0){
          
          this.editarVehiculosXEmpresas(datavehiculosxempresas.idVehiculoXEmpresa);
         }
         
        }
      }); 
  
      
    }
  

}