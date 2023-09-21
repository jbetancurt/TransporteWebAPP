import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostuladosXOfertas, PostuladosXOfertasService } from '../postulados-xofertas';
import { Ofertas, OfertasService } from '../ofertas';
import { Vehiculos, VehiculosService } from '../vehiculos';


@Component({
  selector: 'app-postulados-xofertas',
  templateUrl: './postulados-xofertas.component.html',
  styleUrls: ['./postulados-xofertas.component.scss']
})



export class PostuladosXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idPostuladoXOferta = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstOfertas:Ofertas[]=[];
  lstVehiculos : Vehiculos[]=[];
  //lstpostuladosxofertas:PostuladosXOfertas[]=[];
  FGAgregarPostuladosXOfertas : FormGroup = this.formBuilder.group({      
    idPostuladoXOferta: new FormControl('0'),
    idOferta:new FormControl(0,Validators.required),
    idVehiculo:new FormControl(0,Validators.required),
    
  
  });
    
  cargarNombresPostuladosXOfertas(postuladosxofertas:PostuladosXOfertas){
    this.postuladosxofertasService.Get(postuladosxofertas.idPostuladoXOferta.toString()).subscribe({ 
      next : (datapostuladosxofertas:PostuladosXOfertas) => {
        if (datapostuladosxofertas.idPostuladoXOferta>0){
          this.FGAgregarPostuladosXOfertas.patchValue({
            idPostuladoXOferta:postuladosxofertas.idPostuladoXOferta,
            idVehiculo:postuladosxofertas.idVehiculo,
            idOferta:postuladosxofertas.idOferta
            
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idPostuladoXOferta:number){
    this.idPostuladoXOferta=idPostuladoXOferta;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idPostuladoXOferta>0)
    {
      this.postuladosxofertasService.Get(this.idPostuladoXOferta.toString()).subscribe({
        next : (datapostuladosxofertas:PostuladosXOfertas) => {
          this.cargarNombresPostuladosXOfertas(datapostuladosxofertas);
        }
      });
    }
  }

  ngOnInit() {
    
    this.AbrirInformacion();
    this.listarVehiculos();
    this.listarOfertas();
  }

  constructor(
    private vehiculosService: VehiculosService,
    private ofertasService: OfertasService,
    private formBuilder: FormBuilder, 
    private postuladosxofertasService: PostuladosXOfertasService) { }

    
    listarVehiculos(){ 
      this.vehiculosService.GetAll().subscribe({
        next : (lstvehiculos:Vehiculos[]) => { 
          this.lstVehiculos=lstvehiculos;
        }
      });
    }

    listarOfertas(){ 
      this.ofertasService.GetAll().subscribe({
        next : (lstofertas:Ofertas[]) => { 
          this.lstOfertas=lstofertas;
        }
      });
    }

    crearPostuladosXOfertas(){
      let postuladosxofertas : PostuladosXOfertas = new PostuladosXOfertas;
  
      
      //agregamos los datos del formulario a la tabla ofertas
      postuladosxofertas.idPostuladoXOferta=this.FGAgregarPostuladosXOfertas.value.idPostuladoXOferta;
      postuladosxofertas.idVehiculo=this.FGAgregarPostuladosXOfertas.value.idVehiculo;
      postuladosxofertas.idOferta=this.FGAgregarPostuladosXOfertas.value.idOferta;
      
     //suscrubimos la guardada de los datos en la tabla postuladosxofertas
      this.postuladosxofertasService.create(postuladosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarPostuladosXOfertas(idPostuladoXOferta:number){
      let postuladosxofertas : PostuladosXOfertas = new PostuladosXOfertas;
  //agregamos los datos del formulario a la tabla postuladosxofertas
      postuladosxofertas.idPostuladoXOferta=idPostuladoXOferta;
      postuladosxofertas.idVehiculo=this.FGAgregarPostuladosXOfertas.value.idVehiculo;
      postuladosxofertas.idOferta=this.FGAgregarPostuladosXOfertas.value.idOferta;
     
      
      //suscrubimos la guardada de los datos en la tabla postuladosxofertas
      this.postuladosxofertasService.Edit(postuladosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPostuladosXOfertas=this.FGAgregarPostuladosXOfertas.value;
      this.postuladosxofertasService.Get(fgPostuladosXOfertas.idPostuladoXOferta).subscribe({
        next : (datapostuladosxofertas:PostuladosXOfertas) => {
         if(datapostuladosxofertas.idPostuladoXOferta<=0){
          
          this.crearPostuladosXOfertas();
         }
         else if(datapostuladosxofertas.idPostuladoXOferta>0){
          
          this.editarPostuladosXOfertas(datapostuladosxofertas.idPostuladoXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
