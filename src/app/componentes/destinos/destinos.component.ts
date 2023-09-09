import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Destinos, DestinosService } from '../destinos';
import { Personas, PersonasService } from '../personas';
import { Ciudades, CiudadesService } from '../ciudades';


@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})

export class DestinosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idDestino = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstPersonas:Personas[]=[];
  lstCiudades : Ciudades[]=[];
  //lstdestinos:Destinos[]=[];
  FGAgregarDestinos : FormGroup = this.formBuilder.group({      
    idDestino: new FormControl('0'),
    idContacto:new FormControl(0,Validators.required),
    idCiudad:new FormControl(0,Validators.required),
    observacionDestino: new FormControl('',Validators.required),
    telefonoDestino: new FormControl('',Validators.required),
    direccionDestino: new FormControl('',Validators.required),
  
  });
    
  cargarNombresDestinos(destinos:Destinos){
    this.personasService.Get(destinos.idContacto.toString()).subscribe({ 
      next : (datapersonas:Personas) => {
        if (datapersonas.idPersona>0){
          this.FGAgregarDestinos.patchValue({
            idDestino:destinos.idDestino,
            idCiudad:destinos.idCiudad,
            idContacto:datapersonas.idPersona,
            observacionDestino:destinos.observacionDestino,
            telefonoDestino:destinos.telefonoDestino,
            direccionDestino:destinos.direccionDestino
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idDestino:number){
    this.idDestino=idDestino;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idDestino>0)
    {
      this.destinosService.Get(this.idDestino.toString()).subscribe({
        next : (datadestinos:Destinos) => {
          this.cargarNombresDestinos(datadestinos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarCiudades();
    this.listarPersonas();
  }

  constructor(
    private ciudadesService: CiudadesService,
    private personasService: PersonasService,
    private formBuilder: FormBuilder, 
    private destinosService: DestinosService) { }

    
    listarCiudades(){ 
      this.ciudadesService.GetAll().subscribe({
        next : (lstciudades:Ciudades[]) => { 
          this.lstCiudades=lstciudades;
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

    crearDestinos(){
      let destinos : Destinos = new Destinos;
  
      
      //agregamos los datos del formulario a la tabla personas
      destinos.idDestino=this.FGAgregarDestinos.value.idDestino;
      destinos.idCiudad=this.FGAgregarDestinos.value.idCiudad;
      destinos.idContacto=this.FGAgregarDestinos.value.idContacto;
      destinos.observacionDestino=this.FGAgregarDestinos.value.observacionDestino;
      destinos.direccionDestino=this.FGAgregarDestinos.value.direccionDestino;
      destinos.telefonoDestino=this.FGAgregarDestinos.value.telefonoDestino;
            
     //suscrubimos la guardada de los datos en la tabla destinos
      this.destinosService.create(destinos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarDestinos(idDestino:number){
      let destinos : Destinos = new Destinos;
  //agregamos los datos del formulario a la tabla destinos
      destinos.idDestino=idDestino;
      destinos.idCiudad=this.FGAgregarDestinos.value.idCiudad;
      destinos.idContacto=this.FGAgregarDestinos.value.idContacto;
      destinos.observacionDestino=this.FGAgregarDestinos.value.observacionDestino;
      destinos.direccionDestino=this.FGAgregarDestinos.value.direccionDestino;
      destinos.telefonoDestino=this.FGAgregarDestinos.value.telefonoDestino;
      
      //suscrubimos la guardada de los datos en la tabla destinos
      this.destinosService.Edit(destinos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgDestinos=this.FGAgregarDestinos.value;
      this.destinosService.Get(fgDestinos.idDestino).subscribe({
        next : (datadestinos:Destinos) => {
         if(datadestinos.idDestino<=0){
          
          this.crearDestinos();
         }
         else if(datadestinos.idDestino>0){
          
          this.editarDestinos(datadestinos.idDestino);
         }
         
        }
      }); 
  
      
    }
  

}
