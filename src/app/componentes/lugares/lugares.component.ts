import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lugares, LugaresService } from '../lugares';
import { Personas, PersonasService } from '../personas';
import { Empresas, EmpresasService } from '../empresas';
import { Ciudades, CiudadesService } from '../ciudades';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss']
})


export class LugaresComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idLugar = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstPersonas:Personas[]=[];
  lstCiudades : Ciudades[]=[];
  lstEmpresas:Empresas[]=[];
  //lstlugares:Lugares[]=[];
  FGAgregarLugares : FormGroup = this.formBuilder.group({      
    idLugar: new FormControl('0'),
    idPersona:new FormControl(0,Validators.required),
    idCiudad:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required),
    observacionLugar: new FormControl('',Validators.required),
    telefonoLugar: new FormControl('',Validators.required),
    direccionLugar: new FormControl('',Validators.required),
  
  });
    
  cargarNombresLugares(lugares:Lugares){
    this.lugaresService.Get(lugares.idLugar.toString()).subscribe({ 
      next : (datalugares:Lugares) => {
        if (datalugares.idLugar>0){
          this.FGAgregarLugares.patchValue({
            idLugar:lugares.idLugar,
            idCiudad:lugares.idCiudad,
            idPersona:datalugares.idPersona,
            idEmpresa:lugares.idEmpresa,
            observacionLugar:lugares.observacionLugar,
            telefonoLugar:lugares.telefonoLugar,
            direccionLugar:lugares.direccionLugar
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idLugar:number){
    this.idLugar=idLugar;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idLugar>0)
    {
      this.lugaresService.Get(this.idLugar.toString()).subscribe({
        next : (datalugares:Lugares) => {
          this.cargarNombresLugares(datalugares);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarCiudades();
    this.listarPersonas();
    this.listarEmpresas();
  }

  constructor(
    private ciudadesService: CiudadesService,
    private empresasService: EmpresasService,
    private personasService: PersonasService,
    private formBuilder: FormBuilder, 
    private lugaresService: LugaresService) { }

    
    listarCiudades(){ 
      this.ciudadesService.GetAll().subscribe({
        next : (lstciudades:Ciudades[]) => { 
          this.lstCiudades=lstciudades;
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

    listarPersonas(){ 
      this.personasService.GetAll().subscribe({
        next : (lstpersonas:Personas[]) => { 
          this.lstPersonas=lstpersonas;
        }
      });
    }

    crearLugares(){
      let lugares : Lugares = new Lugares;
  
      
      //agregamos los datos del formulario a la tabla personas
      lugares.idLugar=this.FGAgregarLugares.value.idLugar;
      lugares.idCiudad=this.FGAgregarLugares.value.idCiudad;
      lugares.idPersona=this.FGAgregarLugares.value.idPersona;
      lugares.idEmpresa=this.FGAgregarLugares.value.idEmpresa;
      lugares.observacionLugar=this.FGAgregarLugares.value.observacionLugar;
      lugares.direccionLugar=this.FGAgregarLugares.value.direccionLugar;
      lugares.telefonoLugar=this.FGAgregarLugares.value.telefonoLugar;
            
     //suscrubimos la guardada de los datos en la tabla lugares
      this.lugaresService.create(lugares).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarLugares(idLugar:number){
      let lugares : Lugares = new Lugares;
  //agregamos los datos del formulario a la tabla lugares
      lugares.idLugar=idLugar;
      lugares.idCiudad=this.FGAgregarLugares.value.idCiudad;
      lugares.idPersona=this.FGAgregarLugares.value.idPersona;
      lugares.idEmpresa=this.FGAgregarLugares.value.idEmpresa;
      lugares.observacionLugar=this.FGAgregarLugares.value.observacionLugar;
      lugares.direccionLugar=this.FGAgregarLugares.value.direccionLugar;
      lugares.telefonoLugar=this.FGAgregarLugares.value.telefonoLugar;
      
      //suscrubimos la guardada de los datos en la tabla lugares
      this.lugaresService.Edit(lugares).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgLugares=this.FGAgregarLugares.value;
      this.lugaresService.Get(fgLugares.idLugar).subscribe({
        next : (datalugares:Lugares) => {
         if(datalugares.idLugar<=0){
          
          this.crearLugares();
         }
         else if(datalugares.idLugar>0){
          
          this.editarLugares(datalugares.idLugar);
         }
         
        }
      }); 
  
      
    }
  

}
