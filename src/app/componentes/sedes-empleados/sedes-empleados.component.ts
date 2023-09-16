import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SedesEmpleados, SedesEmpleadosService } from '../sedes-empleados';
import { Personas, PersonasService } from '../personas';
import { Sedes, SedesService } from '../sedes';

@Component({
  selector: 'app-sedes-empleados',
  templateUrl: './sedes-empleados.component.html',
  styleUrls: ['./sedes-empleados.component.css']
})

export class SedesEmpleadosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idSedeEmpleado = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstPersonas:Personas[]=[];
  lstSedes : Sedes[]=[];
  //lstsedesempleados:SedesEmpleados[]=[];
  FGAgregarSedesEmpleados : FormGroup = this.formBuilder.group({      
    idSedeEmpleado: new FormControl('0'),
    idSede:new FormControl(0,Validators.required),
    idPersona:new FormControl(0,Validators.required),
    estadoSedeEmpleado:false,
    telefonoContactoSedeEmpleado: new FormControl('',Validators.required)
  });
    
  cargarNombresSedesEmpleados(sedesempleados:SedesEmpleados){
    this.sedesempleadosService.Get(sedesempleados.idSedeEmpleado.toString()).subscribe({ 
      next : (datasedesempleados:SedesEmpleados) => {
        if (datasedesempleados.idSedeEmpleado>0){
          this.FGAgregarSedesEmpleados.patchValue({
            idSedeEmpleado:sedesempleados.idSedeEmpleado,
            idSede:sedesempleados.idSede,
            idPersona:datasedesempleados.idPersona,
            estadoSedeEmpleado:sedesempleados.estadoSedeEmpleado,
            telefonoContactoSedeEmpleado:sedesempleados.telefonoContactoSedeEmpleado
           
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idSedeEmpleado:number){
    this.idSedeEmpleado=idSedeEmpleado;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idSedeEmpleado>0)
    {
      this.sedesempleadosService.Get(this.idSedeEmpleado.toString()).subscribe({
        next : (datasedesempleados:SedesEmpleados) => {
          this.cargarNombresSedesEmpleados(datasedesempleados);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarSedes();
    this.listarPersonas();
  }

  constructor(
    private sedesService: SedesService,
    private personasService: PersonasService,
    private formBuilder: FormBuilder, 
    private sedesempleadosService: SedesEmpleadosService) { }

    
    listarSedes(){ 
      this.sedesService.GetAll().subscribe({
        next : (lstsedes:Sedes[]) => { 
          this.lstSedes=lstsedes;
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

    crearSedesEmpleados(){
      let sedesempleados : SedesEmpleados = new SedesEmpleados;
  
      
      //agregamos los datos del formulario a la tabla personas
      sedesempleados.idSedeEmpleado=this.FGAgregarSedesEmpleados.value.idSedeEmpleado;
      sedesempleados.idSede=this.FGAgregarSedesEmpleados.value.idSede;
      sedesempleados.idPersona=this.FGAgregarSedesEmpleados.value.idPersona;
      sedesempleados.estadoSedeEmpleado=this.FGAgregarSedesEmpleados.value.estadoSedeEmpleado;
      sedesempleados.telefonoContactoSedeEmpleado=this.FGAgregarSedesEmpleados.value.telefonoContactoSedeEmpleado;
            
     //suscrubimos la guardada de los datos en la tabla sedesempleados
      this.sedesempleadosService.create(sedesempleados).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarSedesEmpleados(idSedeEmpleado:number){
      let sedesempleados : SedesEmpleados = new SedesEmpleados;
  //agregamos los datos del formulario a la tabla sedesempleados
      sedesempleados.idSedeEmpleado=idSedeEmpleado;
      sedesempleados.idSede=this.FGAgregarSedesEmpleados.value.idSede;
      sedesempleados.idPersona=this.FGAgregarSedesEmpleados.value.idPersona;
      sedesempleados.estadoSedeEmpleado=this.FGAgregarSedesEmpleados.value.estadoSedeEmpleado;
      sedesempleados.telefonoContactoSedeEmpleado=this.FGAgregarSedesEmpleados.value.telefonoContactoSedeEmpleado;
      //suscrubimos la guardada de los datos en la tabla sedesempleados
      this.sedesempleadosService.Edit(sedesempleados).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgSedesEmpleados=this.FGAgregarSedesEmpleados.value;
      this.sedesempleadosService.Get(fgSedesEmpleados.idSedeEmpleado).subscribe({
        next : (datasedesempleados:SedesEmpleados) => {
         if(datasedesempleados.idSedeEmpleado<=0){
          
          this.crearSedesEmpleados();
         }
         else if(datasedesempleados.idSedeEmpleado>0){
          
          this.editarSedesEmpleados(datasedesempleados.idSedeEmpleado);
         }
         
        }
      }); 
  
      
    }
  

}
