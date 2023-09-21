import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresas, EmpresasService } from '../empresas';
import { Personas, PersonasService } from '../personas';
import { TiposDeEmpresas, TiposDeEmpresasService } from '../tipos-de-empresas';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})

export class EmpresasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idEmpresa = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstPersonas:Personas[]=[];
  lstTiposDeEmpresas : TiposDeEmpresas[]=[];
  //lstempresas:Empresas[]=[];
  FGAgregarEmpresas : FormGroup = this.formBuilder.group({      
    idEmpresa: new FormControl('0'),
    idContacto:new FormControl(0,Validators.required),
    idTipoDeEmpresa:new FormControl(0,Validators.required),
    nombreEmpresa: new FormControl('',Validators.required),
    nitEmpresa: new FormControl('',Validators.required),
    correoEmpresa: new FormControl('',Validators.required),
    telefonoEmpresa: new FormControl('',Validators.required),
  
  });
    
  cargarNombresEmpresas(empresas:Empresas){
    this.personasService.Get(empresas.idContacto.toString()).subscribe({ 
      next : (datapersonas:Personas) => {
        if (datapersonas.idPersona>0){
          this.FGAgregarEmpresas.patchValue({
            idEmpresa:empresas.idEmpresa,
            idTipoDeEmpresa:empresas.idTipoDeEmpresa,
            idContacto:datapersonas.idPersona,
            nombreEmpresa:empresas.nombreEmpresa,
            nitEmpresa:empresas.nitEmpresa,
            correoEmpresa:empresas.correoEmpresa,
            telefonoEmpresa:empresas.telefonoEmpresa
            
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idEmpresa:number){
    this.idEmpresa=idEmpresa;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idEmpresa>0)
    {
      this.empresasService.Get(this.idEmpresa.toString()).subscribe({
        next : (dataempresas:Empresas) => {
          this.cargarNombresEmpresas(dataempresas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposDeEmpresas();
    this.listarPersonas();
  }

  constructor(
    private tiposdeempresasService: TiposDeEmpresasService,
    private personasService: PersonasService,
    private formBuilder: FormBuilder, 
    private empresasService: EmpresasService) { }

    
    listarTiposDeEmpresas(){ 
      this.tiposdeempresasService.GetAll().subscribe({
        next : (lsttiposdeempresas:TiposDeEmpresas[]) => { 
          this.lstTiposDeEmpresas=lsttiposdeempresas;
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

    crearEmpresas(){
      let empresas : Empresas = new Empresas;
  
      
      //agregamos los datos del formulario a la tabla personas
      empresas.idEmpresa=this.FGAgregarEmpresas.value.idEmpresa;
      empresas.idTipoDeEmpresa=this.FGAgregarEmpresas.value.idTipoDeEmpresa;
      empresas.idContacto=this.FGAgregarEmpresas.value.idContacto;
      empresas.nombreEmpresa=this.FGAgregarEmpresas.value.nombreEmpresa;
      empresas.nitEmpresa=this.FGAgregarEmpresas.value.nitEmpresa;
      empresas.correoEmpresa=this.FGAgregarEmpresas.value.correoEmpresa;
      empresas.telefonoEmpresa=this.FGAgregarEmpresas.value.telefonoEmpresa;
            
     //suscrubimos la guardada de los datos en la tabla empresas
      this.empresasService.create(empresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarEmpresas(idEmpresa:number){
      let empresas : Empresas = new Empresas;
  //agregamos los datos del formulario a la tabla empresas
      empresas.idEmpresa=idEmpresa;
      empresas.idTipoDeEmpresa=this.FGAgregarEmpresas.value.idTipoDeEmpresa;
      empresas.idContacto=this.FGAgregarEmpresas.value.idContacto;
      empresas.nombreEmpresa=this.FGAgregarEmpresas.value.nombreEmpresa;
      empresas.nitEmpresa=this.FGAgregarEmpresas.value.nitEmpresa;
      empresas.correoEmpresa=this.FGAgregarEmpresas.value.correoEmpresa;
      empresas.telefonoEmpresa=this.FGAgregarEmpresas.value.telefonoEmpresa;
      
      
      //suscrubimos la guardada de los datos en la tabla empresas
      this.empresasService.Edit(empresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgEmpresas=this.FGAgregarEmpresas.value;
      this.empresasService.Get(fgEmpresas.idEmpresa).subscribe({
        next : (dataempresas:Empresas) => {
         if(dataempresas.idEmpresa<=0){
          
          this.crearEmpresas();
         }
         else if(dataempresas.idEmpresa>0){
          
          this.editarEmpresas(dataempresas.idEmpresa);
         }
         
        }
      }); 
  
      
    }
  

}
