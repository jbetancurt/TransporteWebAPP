import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LugaresXOfertas, LugaresXOfertasService } from '../lugares-xofertas';
import { Ofertas, OfertasService } from '../ofertas';
import { Personas, PersonasService } from '../personas';
import { Empresas, EmpresasService } from '../empresas';
import { Ciudades, CiudadesService } from '../ciudades';
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../tipos-de-lugares-xofertas';

@Component({
  selector: 'app-lugares-xofertas',
  templateUrl: './lugares-xofertas.component.html',
  styleUrls: ['./lugares-xofertas.component.scss']
})


export class LugaresXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idLugarXOferta = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstOfertas:Ofertas[]=[];
  lstPersonas:Personas[]=[];
  lstCiudades : Ciudades[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposDeLugaresXOfertas : TiposDeLugaresXOfertas[]=[];
  //lstlugaresxofertas:LugaresXOfertas[]=[];
  FGAgregarLugaresXOfertas : FormGroup = this.formBuilder.group({      
    idLugarXOferta: new FormControl('0'),
    idOferta :new FormControl(0,Validators.required),
    idPersona:new FormControl(0,Validators.required),
    idCiudad:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required),
    idTipoDeLugarXOferta:new FormControl(0,Validators.required),
    ordenLugarXOferta:new FormControl(0,Validators.required),
    nombreLugarXOferta:new FormControl('',Validators.required),
    observacionLugarXOferta: new FormControl('',Validators.required),
    telefonoLugarXOferta: new FormControl('',Validators.required),
    direccionLugarXOferta: new FormControl('',Validators.required),
    fechaEnElLugar : new FormControl(new Date,Validators.required),
    duracionEnLugarXOferta:new FormControl(0,Validators.required),
   
  });
    
  cargarNombresLugaresXOfertas(lugaresxofertas:LugaresXOfertas){
    this.lugaresxofertasService.Get(lugaresxofertas.idLugarXOferta.toString()).subscribe({ 
      next : (datalugaresxofertas:LugaresXOfertas) => {
        if (datalugaresxofertas.idLugarXOferta>0){
          this.FGAgregarLugaresXOfertas.patchValue({
            idLugarXOferta:lugaresxofertas.idLugarXOferta,
            idOferta:lugaresxofertas.idOferta,
            idCiudad:lugaresxofertas.idCiudad,
            idPersona:datalugaresxofertas.idPersona,
            idEmpresa:lugaresxofertas.idEmpresa,
            idTipoDeLugarXOferta:lugaresxofertas.idTipoDeLugarXOferta,
            ordenLugarXOferta:lugaresxofertas.ordenLugarXOferta,
            nombreLugarXOferta:lugaresxofertas.nombreLugarXOferta,
            observacionLugarXOferta:lugaresxofertas.observacionLugarXOferta,
            telefonoLugarXOferta:lugaresxofertas.telefonoLugarXOferta,
            direccionLugarXOferta:lugaresxofertas.direccionLugarXOferta,
            fechaEnElLugar : lugaresxofertas.fechaEnElLugar,
            duracionEnLugarXOferta:lugaresxofertas.duracionEnLugarXOferta,
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idLugarXOferta:number){
    this.idLugarXOferta=idLugarXOferta;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idLugarXOferta>0)
    {
      this.lugaresxofertasService.Get(this.idLugarXOferta.toString()).subscribe({
        next : (datalugaresxofertas:LugaresXOfertas) => {
          this.cargarNombresLugaresXOfertas(datalugaresxofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarCiudades();
    this.listarPersonas();
    this.listarEmpresas();
    this.listarOfertas();
    this.listarTiposDeLugaresXOfertas();
  }

  constructor(
    private ciudadesService: CiudadesService,
    private empresasService: EmpresasService,
    private personasService: PersonasService,
    private ofertasService: OfertasService,
    private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService,
    private formBuilder: FormBuilder, 
    private lugaresxofertasService: LugaresXOfertasService) { }

    
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

    listarOfertas(){ 
      this.ofertasService.GetAll().subscribe({
        next : (lstofertas:Ofertas[]) => { 
          this.lstOfertas=lstofertas;
        }
      });
    }

    listarTiposDeLugaresXOfertas(){ 
      this.tiposdelugaresxofertasService.GetAll().subscribe({
        next : (lsttiposdelugaresxofertas:TiposDeLugaresXOfertas[]) => { 
          this.lstTiposDeLugaresXOfertas=lsttiposdelugaresxofertas;
        }
      });
    }

    crearLugaresXOfertas(){
      let lugaresxofertas : LugaresXOfertas = new LugaresXOfertas;
  
      
      //agregamos los datos del formulario a la tabla personas
      lugaresxofertas.idLugarXOferta=this.FGAgregarLugaresXOfertas.value.idLugarXOferta;
      lugaresxofertas.idOferta=this.FGAgregarLugaresXOfertas.value.idOferta;
      lugaresxofertas.idCiudad=this.FGAgregarLugaresXOfertas.value.idCiudad;
      lugaresxofertas.idPersona=this.FGAgregarLugaresXOfertas.value.idPersona;
      lugaresxofertas.idEmpresa=this.FGAgregarLugaresXOfertas.value.idEmpresa;
      lugaresxofertas.idTipoDeLugarXOferta=this.FGAgregarLugaresXOfertas.value.idTipoDeLugarXOferta;
      lugaresxofertas.ordenLugarXOferta=this.FGAgregarLugaresXOfertas.value.ordenLugarXOferta;
      lugaresxofertas.nombreLugarXOferta=this.FGAgregarLugaresXOfertas.value.nombreLugarXOferta;
      lugaresxofertas.observacionLugarXOferta=this.FGAgregarLugaresXOfertas.value.observacionLugarXOferta;
      lugaresxofertas.telefonoLugarXOferta=this.FGAgregarLugaresXOfertas.value.telefonoLugarXOferta;
      lugaresxofertas.direccionLugarXOferta=this.FGAgregarLugaresXOfertas.value.direccionLugarXOferta;
      lugaresxofertas.fechaEnElLugar=this.FGAgregarLugaresXOfertas.value.fechaEnElLugar;
      lugaresxofertas.duracionEnLugarXOferta=this.FGAgregarLugaresXOfertas.value.duracionEnLugarXOferta;
      
     //suscrubimos la guardada de los datos en la tabla lugaresxofertas
      this.lugaresxofertasService.create(lugaresxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarLugaresXOfertas(idLugarXOferta:number){
      let lugaresxofertas : LugaresXOfertas = new LugaresXOfertas;
  //agregamos los datos del formulario a la tabla lugaresxofertas
      lugaresxofertas.idLugarXOferta=idLugarXOferta;
      lugaresxofertas.idOferta=this.FGAgregarLugaresXOfertas.value.idOferta;
      lugaresxofertas.idCiudad=this.FGAgregarLugaresXOfertas.value.idCiudad;
      lugaresxofertas.idPersona=this.FGAgregarLugaresXOfertas.value.idPersona;
      lugaresxofertas.idEmpresa=this.FGAgregarLugaresXOfertas.value.idEmpresa;
      lugaresxofertas.idTipoDeLugarXOferta=this.FGAgregarLugaresXOfertas.value.idTipoDeLugarXOferta;
      lugaresxofertas.ordenLugarXOferta=this.FGAgregarLugaresXOfertas.value.ordenLugarXOferta;
      lugaresxofertas.nombreLugarXOferta=this.FGAgregarLugaresXOfertas.value.nombreLugarXOferta;
      lugaresxofertas.observacionLugarXOferta=this.FGAgregarLugaresXOfertas.value.observacionLugarXOferta;
      lugaresxofertas.telefonoLugarXOferta=this.FGAgregarLugaresXOfertas.value.telefonoLugarXOferta;
      lugaresxofertas.direccionLugarXOferta=this.FGAgregarLugaresXOfertas.value.direccionLugarXOferta;
      lugaresxofertas.fechaEnElLugar=this.FGAgregarLugaresXOfertas.value.fechaEnElLugar;
      lugaresxofertas.duracionEnLugarXOferta=this.FGAgregarLugaresXOfertas.value.duracionEnLugarXOferta;
      
      
      //suscrubimos la guardada de los datos en la tabla lugaresxofertas
      this.lugaresxofertasService.Edit(lugaresxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgLugaresXOfertas=this.FGAgregarLugaresXOfertas.value;
      this.lugaresxofertasService.Get(fgLugaresXOfertas.idLugarXOferta).subscribe({
        next : (datalugaresxofertas:LugaresXOfertas) => {
         if(datalugaresxofertas.idLugarXOferta<=0){
          
          this.crearLugaresXOfertas();
         }
         else if(datalugaresxofertas.idLugarXOferta>0){
          
          this.editarLugaresXOfertas(datalugaresxofertas.idLugarXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
