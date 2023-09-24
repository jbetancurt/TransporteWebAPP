import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasLugaresXOfertas, PlantillasLugaresXOfertasService } from '../plantillas-lugares-xofertas';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { Personas, PersonasService } from '../personas';
import { Empresas, EmpresasService } from '../empresas';
import { Ciudades, CiudadesService } from '../ciudades';
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../tipos-de-lugares-xofertas';

@Component({
  selector: 'app-plantillas-lugares-xofertas',
  templateUrl: './plantillas-lugares-xofertas.component.html',
  styleUrls: ['./plantillas-lugares-xofertas.component.scss']
})


export class PlantillasLugaresXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idLugarXOferta = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstPlantillas_Ofertas:Plantillas_Ofertas[]=[];
  lstPersonas:Personas[]=[];
  lstCiudades : Ciudades[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposDeLugaresXOfertas : TiposDeLugaresXOfertas[]=[];
  //lstplantillaslugaresxofertas:PlantillasLugaresXOfertas[]=[];
  FGAgregarPlantillasLugaresXOfertas : FormGroup = this.formBuilder.group({      
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
   
  });
    
  cargarNombresPlantillasLugaresXOfertas(plantillaslugaresxofertas:PlantillasLugaresXOfertas){
    this.plantillaslugaresxofertasService.Get(plantillaslugaresxofertas.idLugarXOferta.toString()).subscribe({ 
      next : (dataplantillaslugaresxofertas:PlantillasLugaresXOfertas) => {
        if (dataplantillaslugaresxofertas.idLugarXOferta>0){
          this.FGAgregarPlantillasLugaresXOfertas.patchValue({
            idLugarXOferta:plantillaslugaresxofertas.idLugarXOferta,
            idOferta:plantillaslugaresxofertas.idOferta,
            idCiudad:plantillaslugaresxofertas.idCiudad,
            idPersona:dataplantillaslugaresxofertas.idPersona,
            idEmpresa:plantillaslugaresxofertas.idEmpresa,
            idTipoDeLugarXOferta:plantillaslugaresxofertas.idTipoDeLugarXOferta,
            ordenLugarXOferta:plantillaslugaresxofertas.ordenLugarXOferta,
            nombreLugarXOferta:plantillaslugaresxofertas.nombreLugarXOferta,
            observacionLugarXOferta:plantillaslugaresxofertas.observacionLugarXOferta,
            telefonoLugarXOferta:plantillaslugaresxofertas.telefonoLugarXOferta,
            direccionLugarXOferta:plantillaslugaresxofertas.direccionLugarXOferta,
   
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
      this.plantillaslugaresxofertasService.Get(this.idLugarXOferta.toString()).subscribe({
        next : (dataplantillaslugaresxofertas:PlantillasLugaresXOfertas) => {
          this.cargarNombresPlantillasLugaresXOfertas(dataplantillaslugaresxofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarCiudades();
    this.listarPersonas();
    this.listarEmpresas();
    this.listarPlantillas_Ofertas();
    this.listarTiposDeLugaresXOfertas();
  }

  constructor(
    private ciudadesService: CiudadesService,
    private empresasService: EmpresasService,
    private personasService: PersonasService,
    private plantillas_ofertasService: Plantillas_OfertasService,
    private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService,
    private formBuilder: FormBuilder, 
    private plantillaslugaresxofertasService: PlantillasLugaresXOfertasService) { }

    
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

    listarPlantillas_Ofertas(){ 
      this.plantillas_ofertasService.GetAll().subscribe({
        next : (lstplantillas_ofertas:Plantillas_Ofertas[]) => { 
          this.lstPlantillas_Ofertas=lstplantillas_ofertas;
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

    crearPlantillasLugaresXOfertas(){
      let plantillaslugaresxofertas : PlantillasLugaresXOfertas = new PlantillasLugaresXOfertas;
  
      
      //agregamos los datos del formulario a la tabla personas
      plantillaslugaresxofertas.idLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.idLugarXOferta;
      plantillaslugaresxofertas.idOferta=this.FGAgregarPlantillasLugaresXOfertas.value.idOferta;
      plantillaslugaresxofertas.idCiudad=this.FGAgregarPlantillasLugaresXOfertas.value.idCiudad;
      plantillaslugaresxofertas.idPersona=this.FGAgregarPlantillasLugaresXOfertas.value.idPersona;
      plantillaslugaresxofertas.idEmpresa=this.FGAgregarPlantillasLugaresXOfertas.value.idEmpresa;
      plantillaslugaresxofertas.idTipoDeLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.idTipoDeLugarXOferta;
      plantillaslugaresxofertas.ordenLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.ordenLugarXOferta;
      plantillaslugaresxofertas.nombreLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.nombreLugarXOferta;
      plantillaslugaresxofertas.observacionLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.observacionLugarXOferta;
      plantillaslugaresxofertas.telefonoLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.telefonoLugarXOferta;
      plantillaslugaresxofertas.direccionLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.direccionLugarXOferta;
    
      
     //suscrubimos la guardada de los datos en la tabla plantillaslugaresxofertas
      this.plantillaslugaresxofertasService.create(plantillaslugaresxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarPlantillasLugaresXOfertas(idLugarXOferta:number){
      let plantillaslugaresxofertas : PlantillasLugaresXOfertas = new PlantillasLugaresXOfertas;
  //agregamos los datos del formulario a la tabla plantillaslugaresxofertas
      plantillaslugaresxofertas.idLugarXOferta=idLugarXOferta;
      plantillaslugaresxofertas.idOferta=this.FGAgregarPlantillasLugaresXOfertas.value.idOferta;
      plantillaslugaresxofertas.idCiudad=this.FGAgregarPlantillasLugaresXOfertas.value.idCiudad;
      plantillaslugaresxofertas.idPersona=this.FGAgregarPlantillasLugaresXOfertas.value.idPersona;
      plantillaslugaresxofertas.idEmpresa=this.FGAgregarPlantillasLugaresXOfertas.value.idEmpresa;
      plantillaslugaresxofertas.idTipoDeLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.idTipoDeLugarXOferta;
      plantillaslugaresxofertas.ordenLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.ordenLugarXOferta;
      plantillaslugaresxofertas.nombreLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.nombreLugarXOferta;
      plantillaslugaresxofertas.observacionLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.observacionLugarXOferta;
      plantillaslugaresxofertas.telefonoLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.telefonoLugarXOferta;
      plantillaslugaresxofertas.direccionLugarXOferta=this.FGAgregarPlantillasLugaresXOfertas.value.direccionLugarXOferta;
      
      
      //suscrubimos la guardada de los datos en la tabla plantillaslugaresxofertas
      this.plantillaslugaresxofertasService.Edit(plantillaslugaresxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPlantillasLugaresXOfertas=this.FGAgregarPlantillasLugaresXOfertas.value;
      this.plantillaslugaresxofertasService.Get(fgPlantillasLugaresXOfertas.idLugarXOferta).subscribe({
        next : (dataplantillaslugaresxofertas:PlantillasLugaresXOfertas) => {
         if(dataplantillaslugaresxofertas.idLugarXOferta<=0){
          
          this.crearPlantillasLugaresXOfertas();
         }
         else if(dataplantillaslugaresxofertas.idLugarXOferta>0){
          
          this.editarPlantillasLugaresXOfertas(dataplantillaslugaresxofertas.idLugarXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
