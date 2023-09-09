import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Personas, PersonasService } from './';
import { TiposDeDocumentos, TiposDeDocumentosService } from '../tipos-de-documentos';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})

export class PersonasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idPersona = 0;
  editar:boolean=false;
  lstTiposDeDocumentos:TiposDeDocumentos[]=[];
  //lstpersonas:Personas[]=[];
  FGAgregarPersonas : FormGroup = this.formBuilder.group({      
    idPersona:new FormControl('0'),
    nombre1Persona:new FormControl('',Validators.required),
    nombre2Persona:new FormControl('',Validators.required),
    apellido1Persona:new FormControl('',Validators.required),
    apellido2Persona:new FormControl('',Validators.required),
    //nombreCompletoPersona:new FormControl('',Validators.required),
    idTipoDeDocumento:new FormControl('1'),
    documentoDeIdentidadPersona : new FormControl('',Validators.required),
    correoPersona: new FormControl('',Validators.required),
    telefonoPersona : new FormControl('',Validators.required),
    telefonoOtroPersona : new FormControl('',Validators.required),
    direccionPersona : new FormControl('',Validators.required),
    
  });

  
  cargarNombresPersonas(personas:Personas){
    this.FGAgregarPersonas.patchValue({
      idPersona:personas.idPersona,
      nombre1Persona:personas.nombre1Persona,
      nombre2Persona:personas.nombre2Persona,
      apellido1Persona:personas.apellido1Persona,
      apellido2Persona:personas.apellido2Persona,
      nombreCompletoPersona:personas.nombreCompletoPersona,
      idTipoDeDocumento:personas.idTipoDeDocumentoPersona,
      documentoDeIdentidadPersona:personas.documentoDeIdentidadPersona,
      correoPersona:personas.correoPersona,
      telefonoPersona:personas.telefonoPersona,
      telefonoOtroPersona:personas.telefonoOtroPersona,
      direccionPersona:personas.direccionPersona,
    })
  }  
  public asignarid(idPersona:number){
    this.idPersona=idPersona;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idPersona>0)
    {
      this.personasService.Get(this.idPersona.toString()).subscribe({
        next : (datapersonas:Personas) => {
          this.cargarNombresPersonas(datapersonas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposDeDocumentos();
           
  }

  constructor(
    private tiposdedocumentosService: TiposDeDocumentosService,
    private formBuilder: FormBuilder, 
    private personasService: PersonasService) { }

    crearPersonas(){
      let personas : Personas = new Personas;
      //agregamos los datos del formulario a la tabla personas
      personas.idPersona=this.FGAgregarPersonas.value.idPersona;
      personas.nombre1Persona=this.FGAgregarPersonas.value.nombre1Persona;
      personas.nombre2Persona=this.FGAgregarPersonas.value.nombre2Persona;
      personas.apellido1Persona=this.FGAgregarPersonas.value.apellido1Persona;
      personas.apellido2Persona=this.FGAgregarPersonas.value.apellido2Persona;
      personas.nombreCompletoPersona=this.FGAgregarPersonas.value.nombre1Persona+" "+this.FGAgregarPersonas.value.nombre2Persona+" "+this.FGAgregarPersonas.value.apellido1Persona+" "+this.FGAgregarPersonas.value.apellido2Persona;
      personas.idTipoDeDocumentoPersona=this.FGAgregarPersonas.value.idTipoDeDocumento;
      personas.documentoDeIdentidadPersona=this.FGAgregarPersonas.value.documentoDeIdentidadPersona;
      personas.correoPersona=this.FGAgregarPersonas.value.correoPersona;
      personas.telefonoPersona=this.FGAgregarPersonas.value.telefonoPersona;
      personas.telefonoOtroPersona=this.FGAgregarPersonas.value.telefonoOtroPersona;
      personas.direccionPersona=this.FGAgregarPersonas.value.direccionPersona;
      
     //suscrubimos la guardada de los datos en la tabla personas
      this.personasService.create(personas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarTiposDeDocumentos(){ 
      this.tiposdedocumentosService.GetAll().subscribe({
        next : (lsttiposdedocumentos:TiposDeDocumentos[]) => { 
          this.lstTiposDeDocumentos=lsttiposdedocumentos;
        
        }
      });
    }
  
    editarPersonas(idPersona:number){
      let personas : Personas = new Personas;
  
      personas.idPersona=idPersona;
      personas.nombre1Persona=this.FGAgregarPersonas.value.nombre1Persona;
      personas.nombre2Persona=this.FGAgregarPersonas.value.nombre2Persona;
      personas.apellido1Persona=this.FGAgregarPersonas.value.apellido1Persona;
      personas.apellido2Persona=this.FGAgregarPersonas.value.apellido2Persona;
      personas.nombreCompletoPersona=this.FGAgregarPersonas.value.nombre1Persona+" "+this.FGAgregarPersonas.value.nombre2Persona+" "+this.FGAgregarPersonas.value.apellido1Persona+" "+this.FGAgregarPersonas.value.apellido2Persona;
      personas.idTipoDeDocumentoPersona=this.FGAgregarPersonas.value.idTipoDeDocumento;
      personas.documentoDeIdentidadPersona=this.FGAgregarPersonas.value.documentoDeIdentidadPersona;
      personas.correoPersona=this.FGAgregarPersonas.value.correoPersona;
      personas.telefonoPersona=this.FGAgregarPersonas.value.telefonoPersona;
      personas.telefonoOtroPersona=this.FGAgregarPersonas.value.telefonoOtroPersona;
      personas.direccionPersona=this.FGAgregarPersonas.value.direccionPersona;
            
           
    
      //suscrubimos la guardada de los datos en la tabla personas
      this.personasService.Edit(personas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPersonas=this.FGAgregarPersonas.value;
      this.personasService.Get(fgPersonas.idPersona).subscribe({
        next : (datapersonas:Personas) => {
         if(datapersonas.idPersona<=0){
          
          this.crearPersonas();
         }
         else if(datapersonas.idPersona>0){
          
          this.editarPersonas(datapersonas.idPersona);
         }
         
        }
      }); 
  
      
    }
  

}
