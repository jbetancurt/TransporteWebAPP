import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { Destinos, DestinosService } from '../destinos';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../tipos-orientaciones-de-la-oferta';
import { Empresas, EmpresasService } from '../empresas';
const myDate = new Date();

@Component({
  selector: 'app-plantillas-ofertas',
  templateUrl: './plantillas-ofertas.component.html',
  styleUrls: ['./plantillas-ofertas.component.css']
})

export class Plantillas_OfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idOferta = 0;
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstDestinos:Destinos[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
  lstPlantillas_Ofertas:Plantillas_Ofertas[]=[];
  //lstplantillas_ofertas:Plantillas_Ofertas[]=[];
  FGAgregarPlantillas_Ofertas : FormGroup = this.formBuilder.group({      
    idOferta: new FormControl('0'),
    idDestinoInicio:new FormControl(0,Validators.required),
    idDestinoFin:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required),
    idTipoOrientacionDeLaOferta:new FormControl(0,Validators.required),
    codigoOferta:new FormControl('',Validators.required),
    tituloOferta:new FormControl('',Validators.required),
    descripcionOferta:new FormControl('',Validators.required),
    altoOferta:new FormControl(0,Validators.required),
    anchoOferta:new FormControl(0,Validators.required),
    largoOferta:new FormControl(0,Validators.required),
    toneladasOferta:new FormControl(0,Validators.required),
    valorXToneladaOferta:new FormControl(0,Validators.required)
  });
   
  cargarNombresPlantillas_Ofertas(plantillas_ofertas:Plantillas_Ofertas){
    this.FGAgregarPlantillas_Ofertas.patchValue({
      idOferta:plantillas_ofertas.idOferta,
      idDestinoInicio:plantillas_ofertas.idDestinoInicio,
      idDestinoFin:plantillas_ofertas.idDestinoFin,
      idEmpresa:plantillas_ofertas.idEmpresa,
      idTipoOrientacionDeLaOferta:plantillas_ofertas.idTipoOrientacionDeLaOferta,
      codigoOferta:plantillas_ofertas.codigoOferta,
      tituloOferta:plantillas_ofertas.tituloOferta,
      descripcionOferta:plantillas_ofertas.descripcionOferta,
      altoOferta:plantillas_ofertas.altoOferta,
      anchoOferta:plantillas_ofertas.anchoOferta,
      largoOferta:plantillas_ofertas.largoOferta,
      toneladasOferta:plantillas_ofertas.toneladasOferta,
      valorXToneladaOferta:plantillas_ofertas.valorXToneladaOferta,
    
    });
  }  
  

  
  public asignarid(idOferta:number){
    this.idOferta=idOferta;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idOferta>0)
    {
      this.plantillas_ofertasService.Get(this.idOferta.toString()).subscribe({
        next : (dataofertas:Plantillas_Ofertas) => {
          this.cargarNombresPlantillas_Ofertas(dataofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposOrientacionesDeLaOferta();
    this.listarDestinos();
    this.listarEmpresas();
    this.listarPlantillas_Ofertas();
  }

  constructor(
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private destinosService: DestinosService,
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private plantillas_ofertasService: Plantillas_OfertasService) { }

    
    listarTiposOrientacionesDeLaOferta(){ 
      this.tiposorientacionesdelaofertaService.GetAll().subscribe({
        next : (lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => { 
          this.lstTiposOrientacionesDeLaOferta=lsttiposorientacionesdelaoferta;
        }
      });
    }

  
    listarDestinos(){ 
      this.destinosService.GetAll().subscribe({
        next : (lstdestinos:Destinos[]) => { 
          this.lstDestinos=lstdestinos;
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

    listarPlantillas_Ofertas(){
      this.plantillas_ofertasService.GetAll().subscribe({
        next : (lstplantillas_ofertas:Plantillas_Ofertas[]) => {
          this.lstPlantillas_Ofertas=lstplantillas_ofertas;
        }
      });
    }


      

    crearPlantillas_Ofertas(){
      let plantillas_ofertas : Plantillas_Ofertas = new Plantillas_Ofertas;
      
      //agregamos los datos del formulario a la tabla destinos
      
      plantillas_ofertas.idOferta=this.FGAgregarPlantillas_Ofertas.value.idOferta;
     
      plantillas_ofertas.idDestinoInicio=this.FGAgregarPlantillas_Ofertas.value.idDestinoInicio;
      plantillas_ofertas.idDestinoFin=this.FGAgregarPlantillas_Ofertas.value.idDestinoFin;
      plantillas_ofertas.idEmpresa=this.FGAgregarPlantillas_Ofertas.value.idEmpresa;
      plantillas_ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoOrientacionDeLaOferta;
      plantillas_ofertas.codigoOferta=this.FGAgregarPlantillas_Ofertas.value.codigoOferta;
      plantillas_ofertas.tituloOferta=this.FGAgregarPlantillas_Ofertas.value.tituloOferta;
      plantillas_ofertas.descripcionOferta=this.FGAgregarPlantillas_Ofertas.value.descripcionOferta;
      plantillas_ofertas.altoOferta=this.FGAgregarPlantillas_Ofertas.value.altoOferta;
      plantillas_ofertas.anchoOferta=this.FGAgregarPlantillas_Ofertas.value.anchoOferta;
      plantillas_ofertas.largoOferta=this.FGAgregarPlantillas_Ofertas.value.largoOferta;
      plantillas_ofertas.toneladasOferta=this.FGAgregarPlantillas_Ofertas.value.toneladasOferta;
      plantillas_ofertas.valorXToneladaOferta=this.FGAgregarPlantillas_Ofertas.value.valorXToneladaOferta;
      
          
     //suscrubimos la guardada de los datos en la tabla ofertas
      this.plantillas_ofertasService.create(plantillas_ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarPlantillas_Ofertas(idOferta:number){
      let plantillas_ofertas : Plantillas_Ofertas = new Plantillas_Ofertas;
      
  //agregamos los datos del formulario a la tabla ofertas
      plantillas_ofertas.idOferta=idOferta;
     
      plantillas_ofertas.idDestinoInicio=this.FGAgregarPlantillas_Ofertas.value.idDestinoInicio;
      plantillas_ofertas.idDestinoFin=this.FGAgregarPlantillas_Ofertas.value.idDestinoFin;
      plantillas_ofertas.idEmpresa=this.FGAgregarPlantillas_Ofertas.value.idEmpresa;
      plantillas_ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoOrientacionDeLaOferta;
      plantillas_ofertas.codigoOferta=this.FGAgregarPlantillas_Ofertas.value.codigoOferta;
      plantillas_ofertas.tituloOferta=this.FGAgregarPlantillas_Ofertas.value.tituloOferta;
      plantillas_ofertas.descripcionOferta=this.FGAgregarPlantillas_Ofertas.value.descripcionOferta;
      plantillas_ofertas.altoOferta=this.FGAgregarPlantillas_Ofertas.value.altoOferta;
      plantillas_ofertas.anchoOferta=this.FGAgregarPlantillas_Ofertas.value.anchoOferta;
      plantillas_ofertas.largoOferta=this.FGAgregarPlantillas_Ofertas.value.largoOferta;
      plantillas_ofertas.toneladasOferta=this.FGAgregarPlantillas_Ofertas.value.toneladasOferta;
      plantillas_ofertas.valorXToneladaOferta=this.FGAgregarPlantillas_Ofertas.value.valorXToneladaOferta;
      
     
      //suscrubimos la guardada de los datos en la tabla ofertas
      this.plantillas_ofertasService.Edit(plantillas_ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPlantillas_Ofertas=this.FGAgregarPlantillas_Ofertas.value;
      this.plantillas_ofertasService.Get(fgPlantillas_Ofertas.idOferta).subscribe({
        next : (dataplantillas_ofertas:Plantillas_Ofertas) => {
         if(dataplantillas_ofertas.idOferta<=0){
          
          this.crearPlantillas_Ofertas();
         }
         else if(dataplantillas_ofertas.idOferta>0){
          
          this.editarPlantillas_Ofertas(dataplantillas_ofertas.idOferta);
         }
         
        }
      }); 

    }
 
}
