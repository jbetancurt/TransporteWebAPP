import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sedes, SedesService } from './';
import { Empresas, EmpresasService } from '../empresas';
import { Personas, PersonasService } from '../personas';
import { Ciudades, CiudadesService } from '../ciudades';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})

export class SedesComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idSede = 0;
  editar:boolean=false;
  lstEmpresas:Empresas[]=[];
  lstPersonas:Personas[]=[];
  lstCiudades:Ciudades[]=[];
  //lstsedes:Sedes[]=[];
  FGAgregarSedes : FormGroup = this.formBuilder.group({      
    idSede:new FormControl('0'),
    idEmpresa:new FormControl('0'),
    idPersona:new FormControl('0'),
    idCiudad:new FormControl('0'),
    nombreSede:new FormControl('',Validators.required),
    telefonoSede:new FormControl('',Validators.required),
    direccionSede:new FormControl('',Validators.required)
  });

  
  cargarNombresSedes(sedes:Sedes){
    this.FGAgregarSedes.patchValue({
      idSede:sedes.idSede,
      idEmpresa : sedes.idEmpresa,
      idPersona:sedes.idContacto,
      idCiudad:sedes.idCiudad,
      nombreSede:sedes.nombreSede,
      telefonoSede:sedes.telefonoSede,
      direccionSede:sedes.direccionSede
      
   })
  }  
  public asignarid(idSede:number){
    this.idSede=idSede;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idSede>0)
    {
      this.sedesService.Get(this.idSede.toString()).subscribe({
        next : (datasedes:Sedes) => {
          this.cargarNombresSedes(datasedes);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarEmpresas();
    this.listarPersonas();
    this.listarCiudades();
           
  }

  constructor(
    private empresasService: EmpresasService,
    private personasService: PersonasService,
    private ciudadesService: CiudadesService,
    private formBuilder: FormBuilder, 
    private sedesService: SedesService) { }

    crearSedes(){
      let sedes : Sedes = new Sedes;
  
      
      //agregamos los datos del formulario a la tabla personas
      sedes.idSede=this.FGAgregarSedes.value.idSede;
      sedes.idEmpresa=this.FGAgregarSedes.value.idEmpresa;
      sedes.idContacto=this.FGAgregarSedes.value.idPersona;
      sedes.idCiudad=this.FGAgregarSedes.value.idCiudad;
      sedes.nombreSede=this.FGAgregarSedes.value.nombreSede;
      sedes.telefonoSede=this.FGAgregarSedes.value.telefonoSede;
      sedes.direccionSede=this.FGAgregarSedes.value.direccionSede;
      
     //suscrubimos la guardada de los datos en la tabla sedes
      this.sedesService.create(sedes).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarEmpresas(){ 
      this.empresasService.GetAll().subscribe({
        next : (lstempresas:Empresas[]) => { 
          this.lstEmpresas=lstempresas;
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

    listarCiudades(){
      this.ciudadesService.GetAll().subscribe({
        next : (lstciudades:Ciudades[]) => {
          this.lstCiudades=lstciudades;
        }
      });
    }
  
    editarSedes(idSede:number){
      let sedes : Sedes = new Sedes;
  
      sedes.idSede=idSede;
      sedes.idEmpresa=this.FGAgregarSedes.value.idEmpresa;
      sedes.idContacto=this.FGAgregarSedes.value.idPersona;
      sedes.idCiudad=this.FGAgregarSedes.value.idCiudad;  
      sedes.nombreSede=this.FGAgregarSedes.value.nombreSede;
      sedes.telefonoSede=this.FGAgregarSedes.value.telefonoSede;
      sedes.direccionSede=this.FGAgregarSedes.value.direccionSede;
      
      //suscribimos la guardada de los datos en la tabla sedes
      this.sedesService.Edit(sedes).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgSedes=this.FGAgregarSedes.value;
      this.sedesService.Get(fgSedes.idSede).subscribe({
        next : (datasedes:Sedes) => {
         if(datasedes.idSede<=0){
          
          this.crearSedes();
         }
         else if(datasedes.idSede>0){
          
          this.editarSedes(datasedes.idSede);
         }
         
        }
      }); 
  
      
    }
  

}